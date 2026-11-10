import {
  distributions, generatedTokens, promptTokens, simulationSteps, type Focus,
} from '../../lib/inference';

const modelStage: Partial<Record<Focus, string>> = {
  embedding: 'embedding',
  attention: 'transformer',
  cache: 'transformer',
  head: 'head',
  sampling: 'head',
};

function setCurrent(element: HTMLElement, current: boolean, value: 'step' | 'true' = 'step') {
  if (current) element.setAttribute('aria-current', value);
  else element.removeAttribute('aria-current');
}

function setupTrace(root: HTMLElement) {
  function field<T extends HTMLElement = HTMLElement>(name: string) {
    return root.querySelector<T>(`[data-${name}]`)!;
  }

  function text(name: string, value: string | number) {
    field(name).textContent = String(value);
  }

  const playback = field('playback');
  const previous = field<HTMLButtonElement>('previous');
  const next = field<HTMLButtonElement>('next');
  const play = field<HTMLButtonElement>('play');
  const restart = field<HTMLButtonElement>('restart');
  const speed = field<HTMLSelectElement>('speed');
  const systems = field<HTMLInputElement>('systems');
  const progress = field<HTMLProgressElement>('progress');
  const phaseButtons = root.querySelectorAll<HTMLButtonElement>('[data-phase]');
  const nodes = root.querySelectorAll<HTMLElement>('[data-node]');
  const stages = root.querySelectorAll<HTMLElement>('[data-model-stage]');
  const promptParts = root.querySelectorAll<HTMLElement>('[data-prompt-token]');
  const generatedParts = root.querySelectorAll<HTMLElement>('[data-generated-token]');
  const cacheCells = root.querySelectorAll<HTMLElement>('[data-cache-position]');
  const candidates = root.querySelectorAll<HTMLElement>('[data-candidate]');
  const last = simulationSteps.length - 1;

  let index = 0;
  let playing = false;
  let timer: number | undefined;

  function render(announce = false) {
    const step = simulationSteps[index];
    const finished = step.phase === 'stream';
    const selected = step.focus === 'sampling';

    text('step-number', String(index + 1).padStart(2, '0'));
    text('step-title', step.title);
    text('step-description', step.description);
    text('step-why', step.why);
    progress.value = index + 1;
    previous.disabled = index === 0;
    next.disabled = index === last;
    play.textContent = playing ? 'Pause' : index === last ? 'Replay' : 'Play';
    if (announce) {
      text('announcement', `Step ${index + 1} of ${simulationSteps.length}. ${step.title}. ${step.description}`);
    }

    phaseButtons.forEach((button) => setCurrent(button, button.dataset.phase === step.phase));
    nodes.forEach((node) => setCurrent(node, node.dataset.node === step.node));
    const routeStatus = step.packet === 'forward' ? 'Request → worker' : 'Response → client';
    text('route-status', step.packet ? routeStatus : 'At the worker');
    stages.forEach((stage) => setCurrent(stage, stage.dataset.modelStage === modelStage[step.focus]));
    field('embedding').hidden = step.focus !== 'embedding';

    field('raw-prompt').hidden = !!step.promptVisible;
    field('prompt-tokens').hidden = !step.promptVisible;
    promptParts.forEach((token, position) => {
      setCurrent(token, step.activePrompt === position, 'true');
      token.querySelector<HTMLElement>('[data-token-id]')!.hidden = !(systems.checked && step.idsVisible);
    });
    field('no-tokens').hidden = step.sampled > 0;
    field('generated-tokens').hidden = step.sampled === 0;
    generatedParts.forEach((token, position) => {
      token.hidden = position >= step.sampled;
      setCurrent(token, step.activeGenerated === position, 'true');
      token.querySelector<HTMLElement>('[data-token-id]')!.hidden = !systems.checked;
    });

    text('cache-count', step.kv);
    const previousCacheSize = simulationSteps[index - 1]?.kv ?? 0;
    field('cache-panel').toggleAttribute('data-highlight', step.kv > previousCacheSize);
    cacheCells.forEach((cell) => {
      const position = Number(cell.dataset.cachePosition);
      cell.classList.toggle('is-filled', position <= step.kv);
      cell.classList.toggle('is-new', position > previousCacheSize && position <= step.kv);
    });

    const distribution = step.distribution === undefined ? undefined : distributions[step.distribution];
    field('probabilities').hidden = !distribution;
    field('no-probabilities').hidden = !!distribution;
    field('probability-panel').toggleAttribute('data-highlight', !!distribution);
    distribution?.forEach(({ token, value }, position) => {
      const candidate = candidates[position];
      const picked = position === 0 && selected;
      candidate.classList.toggle('is-picked', picked);
      candidate.querySelector<HTMLElement>('[data-candidate-token]')!.textContent = token.replace(/^ /, '␠');
      candidate.querySelector<HTMLElement>('[data-candidate-value]')!.textContent = `${value}%`;
      candidate.querySelector<HTMLElement>('[data-candidate-bar]')!.style.width = `${value}%`;
      candidate.querySelector<HTMLElement>('[data-candidate-selected]')!.hidden = !picked;
    });

    const delivered = generatedTokens.slice(0, step.delivered);
    const events = delivered.map((delta) => `data: ${JSON.stringify({ delta })}`);
    if (finished) {
      const usage = { input_tokens: promptTokens.length, output_tokens: delivered.length };
      events.push(`data: ${JSON.stringify({ finish_reason: 'stop', usage })}`, 'data: [DONE]');
    }
    text('output-status', finished ? 'Complete' : step.delivered > 0 ? 'Streaming' : 'Waiting');
    text('output', delivered.join('') || 'Waiting for the first token…');
    text('event-text', events.join('\n\n'));
    field('events').hidden = events.length === 0;
    field('no-events').hidden = events.length > 0;
    field('metrics').hidden = !systems.checked;
    text('ttft', step.delivered > 0 ? '186 ms' : '—');
    text('tpot', step.delivered > 1 ? '42 ms' : '—');
    text('input-count', step.promptVisible ? promptTokens.length : '—');
    text('output-count', step.sampled);
  }

  function schedule() {
    window.clearTimeout(timer);
    if (!playing) return;
    timer = window.setTimeout(() => {
      index += 1;
      playing = index < last;
      render(!playing);
      schedule();
    }, 1120 / Number(speed.value));
  }

  function go(target: number) {
    playing = false;
    index = Math.max(0, Math.min(last, target));
    schedule();
    render(true);
  }

  previous.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  restart.addEventListener('click', () => go(0));
  play.addEventListener('click', () => {
    playing = !playing;
    if (playing && index === last) index = 0;
    render(!playing);
    schedule();
  });
  speed.addEventListener('change', schedule);
  systems.addEventListener('change', () => render());
  phaseButtons.forEach((button) => {
    const start = simulationSteps.findIndex((step) => step.phase === button.dataset.phase);
    button.addEventListener('click', () => go(start));
  });

  playback.addEventListener('keydown', (event) => {
    // Buttons keep their native Space and Enter behavior. Leave the select and checkbox to the browser.
    if (!(event.target instanceof HTMLButtonElement) || event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        go(index - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        go(index + 1);
        break;
      case 'r':
        go(0);
        break;
    }
  });

  render();
  field('phases').hidden = false;
  progress.hidden = false;
  playback.hidden = false;
}

document.querySelectorAll<HTMLElement>('[data-inference-trace]').forEach(setupTrace);
