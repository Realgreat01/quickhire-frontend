export interface Company {
  company_email: string;
  status: string;
  company_id: string;
  company_name: string;
  company_location: string;
  company_logo: string;
  company_category: string;
  company_cover_image: string;
  company_description: string;
  company_employee_count: number;
  company_website: string;
}
export interface Skill {
  name: string;
  icon: string;
}
export interface Job {
  posted_by: {
    company_name: string;
    company_location: string;
    company_logo: string;
    company_id: string;
  } | null;
  job_title: string;
  isActive: boolean;
  job_description: string;
  job_type: 'Fulltime' | 'Part-Time' | 'Contract' | 'Internship' | 'Voluntary';
  posted_on: Date | string;
  application_ends: Date | string;
  job_duration: Date | string;
  salary: number;
  required_skills: Skill[];
  applicants: string[];
}
