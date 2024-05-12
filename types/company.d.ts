export interface Company {
  company_name: string;
  email: string;
  status: 'company';
  company_id: string;
  password: string;
  website?: string;
  address: AddressInterface;
  description?: string;
  logo?: string;
  cover_image?: string;
  category: string;
  parent_company?: string;
  incorporation_date: Date;
  employee_count: number;
  contact_phone: string;
  operational_status: 'active' | 'inactive' | 'restructuring' | 'bankruptcy';
  social_media: SocialLinks;
}
