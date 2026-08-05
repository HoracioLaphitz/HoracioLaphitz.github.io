/**
 * Domain Entity: Profile
 * Pure business logic, framework-agnostic
 */

export interface ContactInfo {
  readonly email: string;
  readonly phone?: string;
  readonly location: string;
  readonly linkedin: string;
  readonly github: string;
  readonly credly?: string;
}

export interface Experience {
  readonly period: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly description?: string;
  readonly sortDate: Date;
}

export interface Certification {
  readonly period: string;
  readonly title: string;
  readonly issuer: string;
  readonly certificateUrl?: string;
  readonly credlyBadgeId?: string;
  readonly sortDate: Date;
}

export interface Education {
  readonly period: string;
  readonly degree: string;
  readonly institution: string;
  readonly location: string;
  readonly sortDate: Date;
}

export interface Skill {
  readonly name: string;
  readonly category: SkillCategory;
  readonly level?: SkillLevel;
}

export enum SkillCategory {
  Programming = "Programación",
  DataAnalysis = "Análisis de Datos",
  Visualization = "Visualización",
  Database = "Bases de Datos",
  Tools = "Herramientas",
  Soft = "Habilidades Blandas",
  Security = "Seguridad de la Información"
}

export enum SkillLevel {
  Beginner = "Principiante",
  Intermediate = "Intermedio",
  Advanced = "Avanzado",
  Expert = "Experto"
}

export class ProfileEntity {
  constructor(
    public readonly name: string,
    public readonly title: string,
    public readonly summary: readonly string[],
    public readonly contact: ContactInfo,
    public readonly experience: readonly Experience[],
    public readonly certifications: readonly Certification[],
    public readonly education: readonly Education[],
    public readonly skills: readonly Skill[]
  ) {}

  getExperienceByPeriod(): readonly Experience[] {
    return [...this.experience].sort((a, b) => 
      b.sortDate.getTime() - a.sortDate.getTime()
    );
  }

  getCertificationsByPeriod(): readonly Certification[] {
    return [...this.certifications].sort((a, b) => 
      b.sortDate.getTime() - a.sortDate.getTime()
    );
  }

  getSkillsByCategory(category: SkillCategory): readonly Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getTotalYearsOfExperience(): number {
    if (this.experience.length === 0) return 0;
    
    const sortedExp = this.getExperienceByPeriod();
    const oldest = sortedExp[sortedExp.length - 1].sortDate;
    const newest = sortedExp[0].sortDate;
    
    return Math.floor((newest.getTime() - oldest.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }
}
