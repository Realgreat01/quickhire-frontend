import { defineStore } from 'pinia';
import QH_CONSTANTS from '~/constants';

import {
  ADD_USER_PROJECTS,
  DELETE_USER_PROJECTS,
  EDIT_USER_PROJECTS,
  GET_USER_DETAILS,
  GET_USER_EDUCATION,
  GET_USER_EXPERIENCE,
  GET_USER_PROJECTS,
  GET_USER_STACKS,
} from '~/services/user.service';

import type {
  BasicDetails,
  Projects,
  Education,
  Experience,
  Stacks,
} from '~/types/user';

interface UserType {
  BasicDetails: BasicDetails | null;
  Projects: Projects[] | null;
  Educations: Education[] | null;
  Experiences: Experience[] | null;
  Stacks: Stacks | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserType => {
    return {
      BasicDetails: null,
      Projects: null,
      Educations: null,
      Experiences: null,
      Stacks: null,
    };
  },

  getters: {
    basicDetails(): BasicDetails | null {
      return this.BasicDetails;
    },

    projects(): Projects[] | null {
      return this.Projects;
    },

    experiences(): Experience[] | null {
      return this.Experiences;
    },

    educations(): Education[] | null {
      return this.Educations;
    },
    stacks(): Stacks | null {
      return this.Stacks;
    },

    fullname(): string {
      return `${this.BasicDetails?.firstname} ${this.BasicDetails?.lastname}`;
    },
  },

  actions: {
    async getBasicDetails() {
      const response = await GET_USER_DETAILS();
      if (response.success) {
        this.BasicDetails = response.data;
        if (this.basicDetails?.username)
          QH_CONSTANTS.USERNAME = this.basicDetails?.username;
      }
    },

    async getProjects() {
      const response = await GET_USER_PROJECTS();
      if (response.success) {
        this.Projects = response.data;
      }
    },

    async addProject(data: Projects) {
      const response = await ADD_USER_PROJECTS(data);
      if (response.success) {
        qhToast.success('Project added successfully!');
        await this.getProjects();
      }
    },

    async deleteProject(id: string) {
      const response = await DELETE_USER_PROJECTS(id);
      if (response.success) {
        qhToast.success('Project deleted successfully');
        await this.getProjects();
      }
    },
    async editProject(data: Projects, id: string) {
      const response = await EDIT_USER_PROJECTS(data, id);
      if (response.success) {
        qhToast.success('Project editted successfully');
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
    async getStacks() {
      const response = await GET_USER_STACKS();
      if (response.success) {
        this.Stacks = response.data;
      }
    },
  },
  persist: true,
});
