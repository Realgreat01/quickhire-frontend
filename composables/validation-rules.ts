import * as Yup from 'yup';
import RegexExpression from '~/constants/regex';

export class ValidationRules {
  static URL = Yup.string().url('Please enter a valid URL');
  static REQUIRED = Yup.string().required('Please fill this field');

  static company = {
    category: Yup.string().required('category is required'),
    website: Yup.string()
      .required('company website is required')
      .url('please enter a valid URL'),
    contact_phone: Yup.string()
      .required('company phone number is required')
      .matches(
        RegexExpression.mobileNumber,
        'please enter a valid phone number',
      )
      .matches(
        RegexExpression.phoneNumber,
        'phone number must include country code',
      ),
  };

  static job = {
    title: Yup.string().required('title is required'),
    salaryValue: Yup.number()
      .typeError('please enter a valid number')
      .required('salary is required'),
    durationValue: Yup.number()
      .typeError('please enter a valid number')
      .required('duration is required'),
  };

  static userDetails = {
    email: Yup.string()
      .required('email is required')
      .email('enter a valid email'),

    username: Yup.string()
      .required('username is required')
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'username can only contain letters, numbers and underscores',
      ),
    firstname: Yup.string()
      .required('firstname is required')
      .matches(/^[a-zA-Z]+$/, 'firstname can only contain letters'),
    lastname: Yup.string()
      .required('lastname is required')
      .matches(/^[a-zA-Z]+$/, 'lastname can only contain letters'),
    middlename: Yup.string().matches(
      /^[a-zA-Z]+$/,
      'middlename can only contain letters',
    ),
    phone_number: Yup.string()
      .matches(
        RegexExpression.mobileNumber,
        'Please enter a valid phone number',
      )
      .matches(
        RegexExpression.phoneNumber,
        'Phone number must include country code',
      ),
    gender: Yup.string().required('gender is required'),
  };

  static education = {
    institutionName: Yup.string().required('institution name is required'),
    courseOfStudy: Yup.string().required('course of study is required'),
    schoolWebsite: Yup.string().url('Please enter a valid url'),
    entryDate: Yup.string().required('entry date is required'),
    graduationDate: Yup.string().required('graduation date is required'),
  };

  static experience = {
    role: Yup.string().required('Role is required'),
    company: Yup.string().required('company name is required'),
    company_location: Yup.string().required(
      'company location name is required',
    ),
    contributions: Yup.string().required('Contributions is required'),
  };

  static skills = {
    stack: Yup.string(),
  };
  static about = {
    header_bio: Yup.string()
      .min(10, 'short bio should be at least  10 characters  ')
      .max(100, 'short bio cannot be more than 1000 characters '),
    summary: Yup.string()
      .min(24, 'summary should be at least  24 characters  ')
      .max(300, 'summary cannot be more than 300 characters '),
    about_me: Yup.string()
      .min(100, 'about should be at least  100 characters  ')
      .max(1200, 'about cannot be more than 1200 characters '),
  };

  static project = {
    title: Yup.string().required('Title is required'),
    role: Yup.string().required('Role is required'),
    description: Yup.string().required('Description is required'),
    repositoryURL: Yup.string()
      .required('Repository url  is required')
      .url('Please enter a valid URL'),
    previewURL: Yup.string()
      .required('Preview url is required')
      .url('Please enter a valid URL'),
    descriptions: Yup.string().required('Contributions is required'),
    motivations: Yup.string().required('Motivations is required'),
  };
}
