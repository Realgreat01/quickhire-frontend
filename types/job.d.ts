export interface Job {
  posted_by: {
    company_name: string;
    company_location: string;
    company_logo: string;
    company_id: string;
  } | null;
  _id: string;
  job_title: string;
  isActive?: boolean;
  job_description: string;
  job_type?: 'Fulltime' | 'Part-Time' | 'Contract' | 'Internship' | 'Voluntary';
  job_type: string;
  posted_on: Date | string;
  application_ends: Date | string;
  job_duration: Date | string;
  salary: number;
  required_skills: Skill[];
  applicants: any[];
}
