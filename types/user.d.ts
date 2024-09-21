import type {
  AddressInterface,
  JobLocationType,
  JobType,
  Reference,
  Stacks,
  SocialLinks,
} from './utils';

export interface LOGIN_PAYlOAD {
  username?: string;
  email?: string;
  password: string;
}

export interface Settings {
  allow_notifications?: boolean;
  portfolio_type?: string;
  cv_template?: string;
  show_references?: boolean;
  show_summary?: boolean;
  show_education?: boolean;
  send_cover_letter?: boolean;
  use_profile_headline?: boolean;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  profile_picture: string;
  password: string;
  status: 'user';
  firstname: string;
  lastname: string;
  middlename: string;
  phone_number: string;
  is_premium_member: boolean;
  profile_headline: string;
  gender: 'male' | 'female' | 'others';
  about_me: string;
  header_bio: string;
  summary: string;
  cover_letter: string;
  hobbies?: string[];
  interests?: string[];
  years_of_experience: number;
  settings: Settings;
  address: AddressInterface;
  reference: Reference[];
  social_media: SocialLinks;
  experience_level:
    | 'intership'
    | 'entry'
    | 'junior'
    | 'mid'
    | 'senior'
    | 'expert';
  rate: number;
  highest_education_level: Education['type'];
  job_interest: JobLocationType;
  availability: string;
  blogs: object[];
  projects: Projects[];
  education: Education[];
  skills: Skills;
  experience: Experience[];
}

export interface Skills {
  _id: string;
  stack: string;
  top_skills: string[];
  programming_languages: Stacks[];
  frameworks: Stacks[];
  technologies: Stacks[];
  others: string[];
  soft_skills: string[];
}

export interface Education {
  _id: string;
  institution: string;
  course: string;
  entry_date: Date;
  graduation_date: Date;
  type:
    | 'Bachelors'
    | 'Masters'
    | 'Doctorate'
    | 'Elementary'
    | 'Diploma'
    | 'High School'
    | 'Certificate'
    | 'Associate Degree'
    | 'Professional Training';
  school_website: string;
  gpa?: number;
  description: string;
}

export interface Experience {
  _id: string;
  company: string;
  contributions: string;
  company_location: string;
  company_website: string;
  location_type: JobLocationType;
  job_type: JobType;
  start_date: Date;
  end_date: Date | null;
  role: string;
}

export interface Projects {
  _id: string;
  description: string;
  title: string;
  motivations: string;
  tools_used: Stacks[];
  repository: string;
  preview_url: string;
  role?: string;
  project_type?: 'commercial' | 'academic' | 'personal' | 'open source';
  screenshot?: string;
  status?: 'completed' | 'in progress' | 'on hold';
}

export interface PublicUser extends User {
  projects: Projects[];
  education: Education[];
  skills: Skills;
  experience: Experience[];
}
