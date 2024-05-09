import * as Yup from 'yup';
import RegexExpression from '~/constants/regex';

export class ValidationRules {
  static URL = Yup.string().url('Please enter a valid URL');

  static userDetails = {
    firstname: Yup.string().required('firstname is required'),
    lastname: Yup.string().required('lastname is required'),
    middlename: Yup.string().required('middlename is required'),
    phone_number: Yup.string()
      .required('phone is required')
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
      .min(10, 'Short bio should be at least  10 characters  ')
      .max(100, 'Short bio cannot be more than 1000 characters '),
    summary: Yup.string()
      .min(24, 'Summary should be at least  24 characters  ')
      .max(300, 'Summary cannot be more than 300 characters '),
    about_me: Yup.string()
      .min(100, 'About should be at least  100 characters  ')
      .max(1200, 'About cannot be more than 1200 characters '),
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
