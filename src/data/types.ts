export interface Profile {
  name: string;
  firstName: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface ExperienceClient {
  name: string;
  href?: string;
  /** flowing prose shown in place of bullets (editorial presentation) */
  narrative?: string;
}

export interface ExperienceRole {
  company: string;
  location: string;
  title: string;
  period: string;
  /** start/end as ISO-ish for sorting; human string in `period` */
  startYear: number;
  /** flowing prose shown in place of bullets (editorial presentation) */
  narrative?: string;
  /** grouped client work, used by LeftFields */
  clients?: ExperienceClient[];
}

export interface EducationItem {
  school: string;
  location: string;
  degree: string;
  period: string;
  notes: { label: string; value: string }[];
}

export interface ProjectItem {
  name: string;
  tag: string;
  description: string;
  href?: string;
  image?: string;
  imageAlt?: string;
}

export interface OpenSourceItem {
  name: string;
  description: string;
  href?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
}
