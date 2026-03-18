import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, Experience, Project, Education, Certification, Additional, Skills, ScoreData } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface ResumeStore {
  data: ResumeData;
  scoreData: ScoreData | null;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateCoreCompetencies: (competencies: string) => void;
  updateExperienceLevel: (level: string) => void;
  updateSkills: (skills: Partial<Skills>) => void;
  
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (experiences: Experience[]) => void;

  addProject: () => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;

  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  addAdditional: () => void;
  updateAdditional: (id: string, add: Partial<Additional>) => void;
  removeAdditional: (id: string) => void;

  updateDesign: (design: Partial<ResumeData['design']>) => void;
  setScoreData: (scoreData: ScoreData) => void;
}

const defaultData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    photo: '',
  },
  summary: '',
  coreCompetencies: '',
  experienceLevel: 'entry',
  experiences: [],
  projects: [],
  skills: { hard: '', soft: '', languages: '' },
  educations: [],
  certifications: [],
  additional: [],
  design: {
    themeColor: '#000000',
    fontFamily: '"Inter", sans-serif',
    layout: ['summary', 'experience', 'projects', 'skills', 'education', 'certifications', 'additional'],
    template: 'classic',
  },
};

export const useResume = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultData,
      scoreData: null,
      
      updatePersonalInfo: (info) => set((state) => ({ data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } } })),
      updateSummary: (summary) => set((state) => ({ data: { ...state.data, summary } })),
      updateCoreCompetencies: (coreCompetencies) => set((state) => ({ data: { ...state.data, coreCompetencies } })),
      updateExperienceLevel: (level) => set((state) => ({ data: { ...state.data, experienceLevel: level } })),
      updateSkills: (skills) => set((state) => ({ data: { ...state.data, skills: { ...state.data.skills, ...skills } } })),
      
      addExperience: () => set((state) => ({
        data: {
          ...state.data,
          experiences: [...state.data.experiences, { id: uuidv4(), company: '', role: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '', technologies: '', teamSize: '', reasonForLeaving: '' }],
        }
      })),
      updateExperience: (id, exp) => set((state) => ({
        data: {
          ...state.data,
          experiences: state.data.experiences.map((e) => e.id === id ? { ...e, ...exp } : e),
        }
      })),
      removeExperience: (id) => set((state) => ({
        data: { ...state.data, experiences: state.data.experiences.filter((e) => e.id !== id) }
      })),
      reorderExperiences: (experiences) => set((state) => ({ data: { ...state.data, experiences } })),

      addProject: () => set((state) => ({
        data: {
          ...state.data,
          projects: [...state.data.projects, { id: uuidv4(), name: '', role: '', technologies: '', link: '', description: '' }],
        }
      })),
      updateProject: (id, proj) => set((state) => ({
        data: {
          ...state.data,
          projects: state.data.projects.map((p) => p.id === id ? { ...p, ...proj } : p),
        }
      })),
      removeProject: (id) => set((state) => ({
        data: { ...state.data, projects: state.data.projects.filter((p) => p.id !== id) }
      })),
      reorderProjects: (projects) => set((state) => ({ data: { ...state.data, projects } })),

      addEducation: () => set((state) => ({
        data: {
          ...state.data,
          educations: [...state.data.educations, { id: uuidv4(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', coursework: '' }],
        }
      })),
      updateEducation: (id, edu) => set((state) => ({
        data: {
          ...state.data,
          educations: state.data.educations.map((e) => e.id === id ? { ...e, ...edu } : e),
        }
      })),
      removeEducation: (id) => set((state) => ({
        data: { ...state.data, educations: state.data.educations.filter((e) => e.id !== id) }
      })),

      addCertification: () => set((state) => ({
        data: {
          ...state.data,
          certifications: [...state.data.certifications, { id: uuidv4(), name: '', issuer: '', date: '', description: '' }],
        }
      })),
      updateCertification: (id, cert) => set((state) => ({
        data: {
          ...state.data,
          certifications: state.data.certifications.map((c) => c.id === id ? { ...c, ...cert } : c),
        }
      })),
      removeCertification: (id) => set((state) => ({
        data: { ...state.data, certifications: state.data.certifications.filter((c) => c.id !== id) }
      })),

      addAdditional: () => set((state) => ({
        data: {
          ...state.data,
          additional: [...state.data.additional, { id: uuidv4(), role: '', organization: '', duration: '' }],
        }
      })),
      updateAdditional: (id, add) => set((state) => ({
        data: {
          ...state.data,
          additional: state.data.additional.map((a) => a.id === id ? { ...a, ...add } : a),
        }
      })),
      removeAdditional: (id) => set((state) => ({
        data: { ...state.data, additional: state.data.additional.filter((a) => a.id !== id) }
      })),

      updateDesign: (design) => set((state) => ({ data: { ...state.data, design: { ...state.data.design, ...design } } })),
      setScoreData: (scoreData) => set({ scoreData }),
    }),
    {
      name: 'resume-storage',
      // Automatic migration or partializer if needed for old structure? 
      // Safe to just overwrite or merge because it's local development
    }
  )
);
