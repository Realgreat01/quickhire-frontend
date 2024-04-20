import { defineStore } from 'pinia';
import QH_CONSTANTS from '~/constants';
import {
  GET_USER_DETAILS,
  GET_USER_EDUCATION,
  GET_USER_EXPERIENCE,
  GET_USER_PROJECTS,
} from '~/services/user.service';
import type {
  BasicDetails,
  Projects,
  Education,
  Experience,
  Stacks,
} from '~/types';

interface UserType {
  BasicDetails: BasicDetails | null;
  Projects: Projects[] | null;
  Educations: Education[] | null;
  Experiences: Experience[] | null;
  Stacks: Stacks[] | null;
}

export const useUserStore = defineStore(
  'user',
  {
    state: (): UserType => ({
      BasicDetails: null,
      Projects: null,
      Educations: null,
      Experiences: null,
      Stacks: null,
    }),

    getters: {
      basicDetails(): BasicDetails | null {
        return this.BasicDetails;
      },

      projects(): Projects | null {
        return this.Projects;
      },

      experiences(): Experience | null {
        return this.Experiences;
      },

      educations(): Education | null {
        return this.Educations;
      },

      fullname(): string {
        return `${this.BasicDetails?.firstname.toLowerCase()} ${this.BasicDetails?.lastname.toLowerCase()}`;
      },
    },

    actions: {
      async getBasicDetails() {
        const response = await GET_USER_DETAILS();
        if (response.success) {
          this.BasicDetails = response.data;
          QH_CONSTANTS.USERNAME = this.basicDetails.username;
        }
      },

      async getProjects() {
        const response = await GET_USER_PROJECTS();
        if (response.success) {
          this.Projects = response.data;
        }
      },

      async getExperiences() {
        const response = await GET_USER_EXPERIENCE();
        if (response.success) {
          this.Experiences = response.data;
        }
      },

      async getEducation() {
        const response = await GET_USER_EDUCATION();
        if (response.success) {
          this.Educations = response.data;
        }
      },
    },
  },
  { persist: true },
);
