import {
  RiUser2Line,
  RiBriefcase2Line,
  RiBox3Line,
  RiGraduationCapLine,
  RiSendPlaneLine,
  RiSettings4Line,
  RiHomeOfficeLine,
  RiContactsLine,
} from 'vue-remix-icons';
import { QH_ROUTES } from '~/constants/routes';

export const UserNavigations = markRaw([
  {
    title: 'Profile',
    action: '',
    route: QH_ROUTES.USER.DETAILS,
    icon: RiUser2Line,
    class: 'bg-teal-100  text-teal-600',
  },

  {
    title: 'Experience',
    action: '',
    route: QH_ROUTES.USER.EXPERIENCE,
    icon: RiHomeOfficeLine,
    class: 'bg-blue-100  text-blue-800',
  },
  {
    title: 'Applied Jobs',
    action: '',
    route: QH_ROUTES.USER.APPLIED_JOBS,
    icon: RiSendPlaneLine,
    // active: route?.name.includes(QH_ROUTES.USER.APPLIED_JOBS),
    class: 'bg-violet-100  text-violet-800',
  },

  {
    title: 'Projects',
    action: '',
    route: QH_ROUTES.USER.PROJECTS,
    icon: RiBox3Line,
    class: 'bg-indigo-100  text-indigo-800',
  },
  {
    title: 'Education',
    action: '',
    route: QH_ROUTES.USER.EDUCATION,
    icon: RiGraduationCapLine,
    class: '!bg-brand-100  text-brand-600',
  },
  {
    title: 'Work Details',
    action: '',
    route: QH_ROUTES.USER.WORK_DETAILS,
    icon: RiBriefcase2Line,
    class: 'bg-cyan-100  text-cyan-800',
  },
  {
    title: 'Contact',
    action: '',
    route: QH_ROUTES.USER.CONTACT,
    icon: RiContactsLine,
    class: 'bg-cyan-100  text-cyan-800',
  },
  {
    title: 'Settings',
    action: '',
    route: QH_ROUTES.USER.SETTINGS,
    icon: RiSettings4Line,
    class: 'bg-dark-100  text-dark-500',
  },
]);
