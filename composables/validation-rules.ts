import * as Yup from 'yup';
import RegexExpression from '~/constants/regex';

export class ValidationRules {
  static basicDetails = {
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
    institutionName: Yup.string().required('institution date is required'),
    courseOfStudy: Yup.string().required('course of study is required'),
    entryDate: Yup.string().required('entry date is required'),
    graduationDate: Yup.string().required('graduation date is required'),
  };

  static experience = {
    role: Yup.string().required('role is required'),
    company: Yup.string().required('company name is required'),
    contributions: Yup.string().required('contributions is required'),
  };
  static project = {
    title: Yup.string().required('title is required'),
    description: Yup.string().required('description is required'),
    repositoryURL: Yup.string()
      .required('Repository url  is required')
      .matches(RegexExpression.URL, 'Please enter a valid URL'),
    previewURL: Yup.string()
      .required('Preview url is required')
      .matches(RegexExpression.URL, 'Please enter a valid URL'),
    descriptions: Yup.string().required('contributions is required'),
    motivations: Yup.string().required('contributions is required'),
  };
}
