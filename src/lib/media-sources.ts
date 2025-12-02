export type MediaReliability =
  | 'Very High'
  | 'High'
  | 'Mixed'
  | 'Low'
  | 'Very Low';

export type MediaBias =
  | 'Center'
  | 'Center-Left'
  | 'Center-Left (Critical)'
  | 'Center-Right'
  | 'Right (Pro-Admin)'
  | 'Pro-Government'
  | 'Non-partisan'
  | 'Sensationalist'
  | 'Algorithmic'
  | 'Unknown'
  | 'User-Dependent';

export type MediaStatus =
  | 'Reputable'
  | 'Watchdog'
  | 'Biased Opinion'
  | 'Propaganda'
  | 'Tabloid'
  | 'Unverified'
  | 'User-Generated';

export interface MediaSource {
  name: string;
  url: string;
  type: string;
  reliability: MediaReliability;
  bias: MediaBias;
  status: MediaStatus;
}

export const mediaSources: MediaSource[] = [
  // =================================================================
  // TIER 1: MAINSTREAM & LEGACY (The "Standards")
  // =================================================================
  {
    name: 'GMA Network',
    url: 'https://www.gmanetwork.com',
    type: 'Broadcast',
    reliability: 'High',
    bias: 'Center',
    status: 'Reputable',
  },
  {
    name: 'ABS-CBN News',
    url: 'https://www.abs-cbn.com',
    type: 'Broadcast',
    reliability: 'High',
    bias: 'Center-Left',
    status: 'Reputable',
  },
  {
    name: 'TV5 (News5)',
    url: 'https://www.tv5.com.ph',
    type: 'Broadcast',
    reliability: 'High',
    bias: 'Center',
    status: 'Reputable',
  },
  {
    name: 'Philippine Daily Inquirer',
    url: 'https://www.inquirer.net',
    type: 'Broadsheet',
    reliability: 'High',
    bias: 'Center-Left',
    status: 'Reputable',
  },
  {
    name: 'Philstar (The Philippine Star)',
    url: 'https://www.philstar.com',
    type: 'Broadsheet',
    reliability: 'High',
    bias: 'Center',
    status: 'Reputable',
  },
  {
    name: 'BusinessWorld',
    url: 'https://www.bworldonline.com',
    type: 'Broadsheet (Business)',
    reliability: 'Very High',
    bias: 'Center',
    status: 'Reputable',
  },
  {
    name: 'Manila Bulletin',
    url: 'https://mb.com.ph',
    type: 'Broadsheet',
    reliability: 'High',
    bias: 'Center-Right',
    status: 'Reputable',
  },
  {
    name: 'SunStar',
    url: 'https://www.sunstar.com.ph',
    type: 'Regional',
    reliability: 'High',
    bias: 'Center',
    status: 'Reputable',
  },
  {
    name: 'DZRH',
    url: 'https://www.dzrh.com.ph',
    type: 'Radio',
    reliability: 'High',
    bias: 'Center',
    status: 'Reputable',
  },

  // =================================================================
  // TIER 2: INDEPENDENT WATCHDOGS & FACT-CHECKERS
  // =================================================================
  {
    name: 'Rappler',
    url: 'https://www.rappler.com',
    type: 'Digital Native',
    reliability: 'High',
    bias: 'Center-Left (Critical)',
    status: 'Watchdog',
  },
  {
    name: 'VERA Files',
    url: 'https://verafiles.org',
    type: 'Fact-Checker',
    reliability: 'Very High',
    bias: 'Non-partisan',
    status: 'Watchdog',
  },
  {
    name: 'Tsek.ph',
    url: 'https://www.tsek.ph',
    type: 'Collaboration',
    reliability: 'Very High',
    bias: 'Non-partisan',
    status: 'Watchdog',
  },

  // =================================================================
  // TIER 3: MIXED, STATE MEDIA & TABLOIDS (Use with Context)
  // =================================================================
  {
    name: 'The Manila Times',
    url: 'https://www.manilatimes.net',
    type: 'Broadsheet',
    reliability: 'Mixed',
    bias: 'Right (Pro-Admin)',
    status: 'Biased Opinion',
  },
  {
    name: "PTV (People's Television)",
    url: 'https://ptni.gov.ph',
    type: 'State Media',
    reliability: 'Mixed',
    bias: 'Pro-Government',
    status: 'Propaganda',
  },
  {
    name: 'Abante Tonite',
    url: 'https://tonite.abante.com.ph',
    type: 'Tabloid',
    reliability: 'Mixed',
    bias: 'Sensationalist',
    status: 'Tabloid',
  },
  {
    name: 'Manila News',
    url: 'https://manilanews.ph',
    type: 'Aggregator',
    reliability: 'Low',
    bias: 'Unknown',
    status: 'Unverified',
  },

  // =================================================================
  // TIER 4: SOCIAL PLATFORMS (User Generated / The Danger Zone)
  // =================================================================
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    type: 'Social Platform',
    reliability: 'Very Low',
    bias: 'Algorithmic',
    status: 'User-Generated',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com',
    type: 'Social Platform',
    reliability: 'Very Low',
    bias: 'Algorithmic',
    status: 'User-Generated',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com',
    type: 'Social Platform',
    reliability: 'Low',
    bias: 'Algorithmic',
    status: 'User-Generated',
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com',
    type: 'Social Forum',
    reliability: 'Low',
    bias: 'User-Dependent',
    status: 'User-Generated',
  },
];

// Helper: look up metadata by URL hostname
function normalizeHostname(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export function getMediaSourceMeta(url: string): MediaSource | null {
  const host = normalizeHostname(url);
  if (!host) return null;

  return (
    mediaSources.find(source => normalizeHostname(source.url) === host) ?? null
  );
}


