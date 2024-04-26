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
  projectTools: { name: string; icon: string }[];
  githubRepo: string;
  previewLink: string;
}
