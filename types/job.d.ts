import type { AddressInterface } from './utils';

export interface Skills {
  name: string;
  icon: string;
}

export type JobLocationType = 'remote' | 'onsite' | 'hybrid';
export type JobType =
  | 'Full-Time'
  | 'Part-Time'
  | 'Contract'
  | 'Internship'
  | 'Voluntary';

export interface Job {
  posted_by: {
    company_name: string;
    address: AddressInterface;
    logo: string;
    company_id: string;
  };
  _id: string;
  job_title: string;
  isActive?: boolean;
  job_description: string;
  applicants: any[];
  is_new: boolean;
  is_applicant: boolean;
  application_ends: Date | null;
  job_type: JobType;
  posted_on: Date;
  job_duration: {
    date: 'week' | 'month' | 'year';
    value: number;
  };
  job_location_type: JobLocationType;
  salary: {
    currency: string;
    value: number;
  };
  job_status: 'open' | 'closed' | 'paused';
  experience_level:
    | 'intership'
    | 'entry'
    | 'junior'
    | 'mid'
    | 'senior'
    | 'expert';
  required_skills: Skills[];
}
