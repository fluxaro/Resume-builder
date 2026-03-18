export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologies: string;
  teamSize?: string;
  reasonForLeaving?: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  technologies: string;
  link: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Additional {
  id: string;
  role: string;
  organization: string;
  duration: string;
}

export interface Skills {
  hard: string;
  soft: string;
  languages: string;
}

export interface DesignConfig {
  themeColor: string;
  fontFamily: string;
  layout: string[];
  template: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  coreCompetencies: string;
  experienceLevel: string;
  experiences: Experience[];
  projects: Project[];
  skills: Skills;
  educations: Education[];
  certifications: Certification[];
  additional: Additional[];
  design: DesignConfig;
}

export type ScoreData = {
  score: number;
  feedback: string;
  optimizedSummary?: string;
};
