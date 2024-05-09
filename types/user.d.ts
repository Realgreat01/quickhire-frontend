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
  allow_notifications: boolean;
  portfolio_type: 'default';
  cv_template: 'default';
  show_summary: boolean;
  show_education: boolean;
  send_cover_letter: boolean;
}

export interface BasicDetails {
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
  gender: 'male' | 'female' | 'others';
  about_me: string;
  header_bio: string;
  summary: string;
  cover_letter: string;
  hobbies?: string[];
  interests?: string[];
  settings: Settings;
  address: AddressInterface;
  reference: Reference[];
  social_media: SocialLinks;
  experience_level: 'entry' | 'mid' | 'senior';
  rate: number;
  highest_education_level: Education['type'];
  interest_job: JobLocationType;
  availability: string;
  blogs: object[];
}

export interface Skills {
  _id: string;
  stack: string;
  top_skills: Stacks[];
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
  images_or_screenshots?: string[];
  status?: 'completed' | 'in progress' | 'on hold';
}

export interface PublicUser {
  _id: string;
  email: string;
  username: string;
  profile_picture: string;
  password: string;
  firstname: string;
  lastname: string;
  middlename: string;
  phone_number: string;
  gender: 'male' | 'female' | 'others';
  about_me: string;
  header_bio: string;
  summary: string;
  cover_letter: string;
  hobbies?: string[];
  interests?: string[];
  address: AddressInterface;
  reference: Reference[];
  social_media: SocialLinks;
  experience_level: 'entry' | 'mid' | 'senior';
  rate: number;
  highest_education_level: Education['type'];
  job_interest: JobLocationType;
  availability: string;
  blogs: object[];
  projects: Projects[];
  experience: Experience[];
  skills: Skills;
  education: Education[];
}
