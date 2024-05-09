export interface AddressInterface {
  country: string;
  alpha_code: string;
  state: string;
  area?: string;
  city: string;
  street: string;
  postal_code?: string | number;
  zip_code?: string | number;
}

export interface SocialLinks {
  github?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  hashnode?: string;
  twitch?: string;
}

export interface Stacks {
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

export interface Notification {
  title: string;
  body: string;
  created_at: Date;
  is_read: boolean;
  notification_type: 'general' | 'updates' | 'security';
}

interface Reference {
  name: string;
  title: string;
  relationship: string;
}
