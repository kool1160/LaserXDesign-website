export type ReleaseState = 'development' | 'private-beta' | 'public-beta' | 'trial' | 'released';

export const releaseState: ReleaseState = 'development';

export const releaseLabels: Record<ReleaseState, string> = {
  development: 'In development',
  'private-beta': 'Private beta',
  'public-beta': 'Public beta',
  trial: 'Public trial',
  released: 'Released',
};

export const releaseCtas: Record<ReleaseState, { primary: string; primaryHref: string; secondary: string; secondaryHref: string }> = {
  development: {
    primary: 'See how LaserX works',
    primaryHref: '#how-it-works',
    secondary: 'Get launch updates',
    secondaryHref: 'mailto:hello@laserxdesign.com?subject=LaserX%20Design%20Studio%20launch%20updates',
  },
  'private-beta': {
    primary: 'Join the private beta',
    primaryHref: '/early-access',
    secondary: 'See how it works',
    secondaryHref: '#how-it-works',
  },
  'public-beta': {
    primary: 'Download beta',
    primaryHref: '/download',
    secondary: 'Report feedback',
    secondaryHref: '/feedback',
  },
  trial: {
    primary: 'Start 14-day trial',
    primaryHref: '/download',
    secondary: 'See pricing',
    secondaryHref: '/pricing',
  },
  released: {
    primary: 'Try LaserX free',
    primaryHref: '/download',
    secondary: 'Buy a license',
    secondaryHref: '/pricing',
  },
};

export const currentCtas = releaseCtas[releaseState];
export const currentReleaseLabel = releaseLabels[releaseState];

export const pricing = {
  trialDays: 14,
  creditCardRequired: false,
  founderPrice: null as number | null,
  standardAnnualPrice: null as number | null,
  currency: 'USD',
};

export const product = {
  name: 'LaserX Design Studio',
  shortName: 'LaserX',
  platform: 'Windows',
  positioning: 'From idea to cut-ready design.',
  distinction: 'LaserX creates the product. Your machine software cuts it.',
  description:
    'LaserX Design Studio helps makers create, import, repair, physically preview, and export flat-cut signs and layered products for the machine software they already use.',
};
