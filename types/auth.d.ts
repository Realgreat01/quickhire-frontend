export interface LOGIN_PAYLOAD {
  username?: string;
  email?: string;
  password: string;
}
export interface REGISTER_USER_PAYLOAD {
  username?: string;
  email?: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface RESET_PASSWORD_PAYLOAD {
  email: string;
  password: string;
  verification_code: number;
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

export {};
