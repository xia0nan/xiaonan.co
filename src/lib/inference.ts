export type Phase = "request" | "tokenize" | "prefill" | "decode" | "stream";
export type Focus = "request" | "tokens" | "embedding" | "attention" | "cache" | "head" | "sampling" | "transport";
export type SystemNode = "client" | "gateway" | "scheduler" | "gpu";

export type SimulationStep = {
  phase: Phase;
  title: string;
  description: string;
  why: string;
  node: SystemNode;
  focus: Focus;
  promptVisible?: boolean;
  idsVisible?: boolean;
  kv: number;
  sampled: number;
  delivered: number;
  activePrompt?: number;
  activeGenerated?: number;
  distribution?: 0 | 1 | 2 | 3 | 4;
  packet?: "forward" | "return";
};

export const phases: { key: Phase; label: string; number: string }[] = [
  { key: "request", label: "Request", number: "01" },
  { key: "tokenize", label: "Tokenize", number: "02" },
  { key: "prefill", label: "Prefill", number: "03" },
  { key: "decode", label: "Decode", number: "04" },
  { key: "stream", label: "Finish", number: "05" },
];

export const promptText = "Can shadows outrun light?";
export const promptTokens = ["Can", " shadows", " outrun", " light?"];
export const promptIds = ["9137", "382", "27903", "6437"];
export const generatedTokens = ["Yes,", " without", " carrying", " information."];
export const generatedIds = ["18432", "315", "50217", "23841"];

// Adapted from version 4 of the original Sites explainer. Token boundaries, IDs,
// and probabilities are illustrative. This trace describes a single request.
// KV counts refer to sequence positions, not the number of actual tensors.
export const simulationSteps: SimulationStep[] = [
  {
    phase: "request", title: "Send the request",
    description: "The client sends “Can shadows outrun light?” to the model API.",
    why: "The prompt begins as text in an HTTP request.",
    node: "client", focus: "request",
    kv: 0, sampled: 0, delivered: 0, packet: "forward",
  },
  {
    phase: "request", title: "Receive at the gateway",
    description: "The gateway accepts the request and checks authentication and rate limits.",
    why: "The gateway handles API concerns before a model worker is selected.",
    node: "gateway", focus: "request",
    kv: 0, sampled: 0, delivered: 0, packet: "forward",
  },
  {
    phase: "request", title: "Queue and schedule",
    description: "The scheduler queues the request and considers available GPU workers.",
    why: "Serving systems can batch compatible work to use the GPU efficiently.",
    node: "scheduler", focus: "request",
    kv: 0, sampled: 0, delivered: 0, packet: "forward",
  },
  {
    phase: "request", title: "Assign a GPU worker",
    description: "The request reaches a GPU worker with the model ready for inference.",
    why: "The serving system can route requests independently of model computation.",
    node: "gpu", focus: "request",
    kv: 0, sampled: 0, delivered: 0, packet: "forward",
  },
  {
    phase: "tokenize", title: "Split the prompt into tokens",
    description: "In this trace, the question becomes four pieces. Three include a leading space.",
    why: "Token boundaries depend on the tokenizer. In a real vocabulary, punctuation may have its own ID.",
    node: "gpu", focus: "tokens", promptVisible: true,
    kv: 0, sampled: 0, delivered: 0,
  },
  {
    phase: "tokenize", title: "Look up token IDs",
    description: "Each example piece maps to an integer ID in a vocabulary.",
    why: "These IDs stand in for positions in a tokenizer’s vocabulary.",
    node: "gpu", focus: "tokens", promptVisible: true, idsVisible: true,
    kv: 0, sampled: 0, delivered: 0, activePrompt: 0,
  },
  {
    phase: "tokenize", title: "Create embeddings",
    description: "The token IDs become dense vectors before entering the Transformer.",
    why: "The small vector shown below stands in for a representation with many dimensions.",
    node: "gpu", focus: "embedding", promptVisible: true, idsVisible: true,
    kv: 0, sampled: 0, delivered: 0, activePrompt: 3,
  },
  {
    phase: "prefill", title: "Process the prompt",
    description: "Prefill runs the four prompt positions through the Transformer together.",
    why: "Unlike decode, this phase can compute many prompt positions in parallel.",
    node: "gpu", focus: "attention", promptVisible: true, idsVisible: true,
    kv: 0, sampled: 0, delivered: 0,
  },
  {
    phase: "prefill", title: "Compute attention",
    description: "Each attention layer forms query, key and value representations for the prompt.",
    why: "Keys and values can be saved for reuse when generation begins.",
    node: "gpu", focus: "attention", promptVisible: true, idsVisible: true,
    kv: 0, sampled: 0, delivered: 0,
  },
  {
    phase: "prefill", title: "Fill the KV cache",
    description: "Key and value representations for all four prompt positions enter the cache.",
    why: "The visible rows summarize tensors across many layers and attention heads.",
    node: "gpu", focus: "cache", promptVisible: true, idsVisible: true,
    kv: 4, sampled: 0, delivered: 0,
  },
  {
    phase: "prefill", title: "Project to vocabulary logits",
    description: "The last prompt position’s hidden state reaches the LM head, producing logits.",
    why: "The server converts the scores to probabilities before it chooses a token.",
    node: "gpu", focus: "head", promptVisible: true, idsVisible: true,
    kv: 4, sampled: 0, delivered: 0, distribution: 0, activePrompt: 3,
  },
  {
    phase: "prefill", title: "Select the first token",
    description: "The sampler picks “Yes,” as the first output token.",
    why: "The first prediction comes from prefill. Decode begins when that prediction becomes the model’s next input.",
    node: "gpu", focus: "sampling", promptVisible: true, idsVisible: true,
    kv: 4, sampled: 1, delivered: 0, distribution: 0, activeGenerated: 0,
  },
  {
    phase: "decode", title: "Stream “Yes,”",
    description: "The server sends “Yes,” as a delta; the client can show it immediately.",
    why: "Streaming transports a selected token while generation continues.",
    node: "gateway", focus: "transport", promptVisible: true, idsVisible: true,
    kv: 4, sampled: 1, delivered: 1, activeGenerated: 0, packet: "return",
  },
  {
    phase: "decode", title: "Start a decode iteration",
    description: "The generated token “Yes,” becomes the next Transformer input.",
    why: "Autoregressive generation conditions each prediction on preceding tokens.",
    node: "gpu", focus: "attention", promptVisible: true, idsVisible: true,
    kv: 4, sampled: 1, delivered: 1, activeGenerated: 0,
  },
  {
    phase: "decode", title: "Reuse cached context",
    description: "The worker reads four cached positions and appends K/V for “Yes,”.",
    why: "Reusing earlier keys and values saves work on every decode iteration.",
    node: "gpu", focus: "cache", promptVisible: true, idsVisible: true,
    kv: 5, sampled: 1, delivered: 1, activeGenerated: 0,
  },
  {
    phase: "decode", title: "Score the next token",
    description: "The new hidden state passes through the LM head to produce fresh logits.",
    why: "Sampling settings such as temperature can change the probabilities derived from the scores.",
    node: "gpu", focus: "head", promptVisible: true, idsVisible: true,
    kv: 5, sampled: 1, delivered: 1, distribution: 1,
  },
  {
    phase: "decode", title: "Select “ without”",
    description: "The next sampled token is “ without”, including its leading space.",
    why: "Only the selected token is added to this generated sequence.",
    node: "gpu", focus: "sampling", promptVisible: true, idsVisible: true,
    kv: 5, sampled: 2, delivered: 1, distribution: 1, activeGenerated: 1,
  },
  {
    phase: "decode", title: "Stream “ without”",
    description: "A second delta reaches the client, which now displays “Yes, without”.",
    why: "Transport is separate from model computation.",
    node: "gateway", focus: "transport", promptVisible: true, idsVisible: true,
    kv: 5, sampled: 2, delivered: 2, activeGenerated: 1, packet: "return",
  },
  {
    phase: "decode", title: "Feed “ without” back in",
    description: "The worker processes the second output token using cached context.",
    why: "One new token enters this decode iteration in the simplified example.",
    node: "gpu", focus: "attention", promptVisible: true, idsVisible: true,
    kv: 5, sampled: 2, delivered: 2, activeGenerated: 1,
  },
  {
    phase: "decode", title: "Append another KV position",
    description: "The cache grows from five to six positions as “ without” is processed.",
    why: "The worker keeps the earlier keys and values and adds a new position.",
    node: "gpu", focus: "cache", promptVisible: true, idsVisible: true,
    kv: 6, sampled: 2, delivered: 2, activeGenerated: 1,
  },
  {
    phase: "decode", title: "Score again",
    description: "The LM head scores possible tokens after “Yes, without”.",
    why: "The distribution changes as the context grows.",
    node: "gpu", focus: "head", promptVisible: true, idsVisible: true,
    kv: 6, sampled: 2, delivered: 2, distribution: 2,
  },
  {
    phase: "decode", title: "Select “ carrying”",
    description: "The next selected piece is “ carrying”.",
    why: "These illustrative probabilities shift with each new token in the context.",
    node: "gpu", focus: "sampling", promptVisible: true, idsVisible: true,
    kv: 6, sampled: 3, delivered: 2, distribution: 2, activeGenerated: 2,
  },
  {
    phase: "decode", title: "Stream “ carrying”",
    description: "The client receives a third delta: “Yes, without carrying”.",
    why: "The reader sees the partial response before it is complete.",
    node: "gateway", focus: "transport", promptVisible: true, idsVisible: true,
    kv: 6, sampled: 3, delivered: 3, activeGenerated: 2, packet: "return",
  },
  {
    phase: "decode", title: "Feed “ carrying” back in",
    description: "The worker processes “ carrying” with six cached positions.",
    why: "The next prediction uses both prompt and generated context.",
    node: "gpu", focus: "attention", promptVisible: true, idsVisible: true,
    kv: 6, sampled: 3, delivered: 3, activeGenerated: 2,
  },
  {
    phase: "decode", title: "Append a seventh position",
    description: "K/V for “ carrying” is appended to the cache.",
    why: "Each decode iteration adds one sequence position in this view.",
    node: "gpu", focus: "cache", promptVisible: true, idsVisible: true,
    kv: 7, sampled: 3, delivered: 3, activeGenerated: 2,
  },
  {
    phase: "decode", title: "Score the next token again",
    description: "The LM head produces a distribution after “Yes, without carrying”.",
    why: "The model chooses its next token from the current context.",
    node: "gpu", focus: "head", promptVisible: true, idsVisible: true,
    kv: 7, sampled: 3, delivered: 3, distribution: 3,
  },
  {
    phase: "decode", title: "Select “ information.”",
    description: "Sampling picks “ information.” as the fourth visible output token.",
    why: "It can be sent before the model decides whether to stop.",
    node: "gpu", focus: "sampling", promptVisible: true, idsVisible: true,
    kv: 7, sampled: 4, delivered: 3, distribution: 3, activeGenerated: 3,
  },
  {
    phase: "decode", title: "Stream the last text token",
    description: "The fourth delta completes “Yes, without carrying information.” on the client.",
    why: "The response appears incrementally rather than all at once.",
    node: "gateway", focus: "transport", promptVisible: true, idsVisible: true,
    kv: 7, sampled: 4, delivered: 4, activeGenerated: 3, packet: "return",
  },
  {
    phase: "decode", title: "Select the stop token",
    description: "The worker processes “ information.”, appends an eighth cache position, then selects <eos>.",
    why: "The stop token ends generation and the client keeps the text it has received.",
    node: "gpu", focus: "sampling", promptVisible: true, idsVisible: true,
    kv: 8, sampled: 4, delivered: 4, distribution: 4,
  },
  {
    phase: "stream", title: "Finish the stream",
    description: "The server sends a completion event, then a [DONE] marker, and closes the connection.",
    why: "Transport reports completion after model inference ends.",
    node: "client", focus: "transport", promptVisible: true, idsVisible: true,
    kv: 8, sampled: 4, delivered: 4, packet: "return",
  },
];

export const distributions = [
  [{ token: "Yes,", value: 48 }, { token: "No,", value: 25 }, { token: "Only", value: 17 }, { token: "A", value: 10 }],
  [{ token: " without", value: 62 }, { token: " but", value: 20 }, { token: " if", value: 11 }, { token: " not", value: 7 }],
  [{ token: " carrying", value: 53 }, { token: " transmitting", value: 21 }, { token: " moving", value: 17 }, { token: " sending", value: 9 }],
  [{ token: " information.", value: 60 }, { token: " signals.", value: 25 }, { token: " energy.", value: 10 }, { token: " matter.", value: 5 }],
  [{ token: "<eos>", value: 75 }, { token: " It", value: 15 }, { token: " This", value: 6 }, { token: "!", value: 4 }],
];
