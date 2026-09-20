interface SiteConfig {
  name: string;
  alternateName: string;
  url: string;
  positioning: string;
  description: string;
  navigation: { label: string; href: string }[];
  profiles: { label: string; href: string }[];
  interests: { title: string; description: string }[];
}

export const site: SiteConfig = {
  name: 'Xiao Nan',
  alternateName: 'Shawn',
  url: 'https://xiaonan.co',
  positioning: 'Applied AI · ML Systems · Product',
  description: 'Xiao Nan / Shawn — applied AI and agentic workflows, with a focus on reliability, scale, technology, and finance.',
  navigation: [
    { label: 'Work', href: '/work/' },
    { label: 'Writing', href: '/writing/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'About', href: '/about/' },
  ],
  profiles: [
    { label: 'GitHub', href: 'https://github.com/xia0nan' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xiao-nan/' },
    { label: 'Medium', href: 'https://medium.com/@xiao.nan' },
  ],
  interests: [
    { title: 'Applied AI', description: 'Exploring practical applications of AI in technology and finance.' },
    { title: 'Agentic workflows', description: 'How to make AI agents and the workflows around them more reliable.' },
    { title: 'Reliability and scale', description: 'What it takes for AI systems to work dependably as their use grows.' },
  ],
};

export const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.alternateName,
  url: site.url,
  sameAs: site.profiles.map((profile) => profile.href),
};
