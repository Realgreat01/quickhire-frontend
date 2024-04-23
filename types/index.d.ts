export interface LOGIN_PAYlOAD {
  username?: string;
  email?: string;
  password: string;
}

export interface BasicDetails {
  email: string;
  username: string;
  profile_picture: string;
  firstname: string;
  lastname: string;
  middlename: string;
  phone_number: string;
  gender: 'male' | 'female' | 'others' | '';
}

export interface Stacks {
  stack: string;
  topLanguage: string;
  programmingLanguages: string[];
  frameworks: string[];
}

export interface Education {
  institution: string;
  course: string;
  entryDate: Date | string;
  graduationDate: Date | string;
}

export interface Experience {
  company: string;
  contributions: string;
  startDate: Date | string;
  endDate: Date | string | null;
  role: string;
}

export interface Projects {
  projectDescription: string;
  projectName: string;
  projectLesson: string;
  projectTools: string[];
  githubRepo: string;
  previewLink: string;
}

export interface Job {
  posted_by?: string;
  job_title: string;
  job_description: string;
  job_type: 'Fulltime' | 'Part-Time' | 'Contract' | 'Internship' | 'Voluntary';
  posted_on: Date;
  application_ends: Date;
  job_duration: Date;
  salary: string | number;
  required_skills: string[];
}
