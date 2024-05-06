export interface LOGIN_PAYlOAD {
  username?: string;
  email?: string;
  password: string;
}

export interface REGISTER_COMPANY_PAYLOAD {
  company_location: string;
  company_name: string;
  company_email: string;
  company_password: string;
}
export interface LOGIN_COMPANY_PAYLOAD {
  emailORCompanyId: string;
  password: string;
}
