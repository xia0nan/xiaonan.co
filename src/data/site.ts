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
  description: 'Xiao Nan / Shawn — interests, work, and writing across applied AI, ML systems, and product.',
  navigation: [
    { label: 'Work', href: '/work/' },
    { label: 'Writing', href: '/writing/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'About', href: '/about/' },
  ],
  profiles: [{ label: 'GitHub', href: 'https://github.com/xia0nan' }],
  interests: [
    { title: 'Applied AI', description: 'Turning model capabilities into useful tools for real problems.' },
    { title: 'ML systems', description: 'The systems that make machine learning reliable in practice.' },
    { title: 'Product', description: 'Connecting technical possibilities with what people need.' },
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
