export interface Source {
  label: string;
  url: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  source: Source;
}

export interface CareerEvent {
  date: string;
  title: string;
  description: string;
  isMilestone: boolean;
  source: Source;
}

export interface Platform {
  title: string;
  description: string;
  source: Source;
}

export interface Controversy {
  title: string;
  summary: string;
  outcome: string;
  source: Source;
}

export interface Promise {
  promise: string;
  relatedActions: {
    description: string;
    source: Source;
  }[];
}

export interface Candidate {
  id: string;
  fullName: string;
  positionSought: string;
  politicalAffiliation: string;
  imageUrlId: string;
  education: Education[];
  careerTimeline: CareerEvent[];
  platforms: Platform[];
  controversies: Controversy[];
  promises: Promise[];
}
