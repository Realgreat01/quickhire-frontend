import { defineStore } from 'pinia';
import QH_CONSTANTS from '~/constants';

import {
  ADD_USER_PROJECTS,
  DELETE_USER_EDUCATION,
  DELETE_USER_EXPERIENCE,
  DELETE_USER_PROJECTS,
  EDIT_USER_DETAILS,
  EDIT_USER_PROJECTS,
  GET_ALL_USERS,
  GET_USER_BY_USERNAME,
  GET_USER_DETAILS,
  GET_USER_EDUCATION,
  GET_USER_EXPERIENCE,
  GET_USER_PROJECTS,
  GET_USER_SKILLS,
  UPDATE_USER_SKILLS,
} from '~/services/user.service';

import type {
  User,
  Projects,
  Education,
  Experience,
  Skills,
  PublicUser,
} from '~/types/user';

interface UserType {
  User: User | null;
  Projects: Projects[] | null;
  Educations: Education[] | null;
  Experiences: Experience[] | null;
  Skills: Skills | null;
  PublicUser: PublicUser | null;
  AllUsers: User[] | null;
  updating: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserType => {
    return {
      User: null,
      Projects: null,
      Educations: null,
      Experiences: null,
      Skills: null,
      PublicUser: null,
      AllUsers: null,
      updating: false,
    };
  },

  getters: {
    user(): User | null {
      return this.User;
    },
    allUsers(): User[] | null {
      return this.AllUsers;
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

    skills(): Skills | null {
      return this.Skills;
    },

    publicUser(): PublicUser | null {
      return this.PublicUser;
    },

    fullname(): string {
      if (this.user) {
        return `${this.user?.firstname} ${this.user?.lastname}`;
      } else return '';
    },
  },

  actions: {
    async getPublicUser(username: string) {
      const response = await GET_USER_BY_USERNAME(username);
      if (response.success) {
        this.PublicUser = response.data;
      }
    },
    async getAllUsers() {
      const response = await GET_ALL_USERS();
      if (response.success) {
        this.AllUsers = response.data;
      }
    },

    async getCurrentUser() {
      const response = await GET_USER_DETAILS();
      if (response.success) {
        this.User = response.data;
        if (this.User?.username) QH_CONSTANTS.USERNAME = this.User?.username;
      }
    },

    async updateUserDetails(data: User | any) {
      this.updating = true;
      const response = await EDIT_USER_DETAILS(data);
      try {
        if (response.success) {
          qhToast.success('user details updated successfully');
          this.getCurrentUser();
        }
      } catch (error) {
      } finally {
        this.updating = false;
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

    async deleteExperience(id: string) {
      const response = await DELETE_USER_EXPERIENCE(id);
      if (response.success) {
        qhToast.success('Experience deleted successfully');
        await this.getExperiences();
      }
    },

    async getEducation() {
      const response = await GET_USER_EDUCATION();
      if (response.success) {
        this.Educations = response.data;
      }
    },

    async deleteEducation(id: string) {
      const response = await DELETE_USER_EDUCATION(id);
      if (response.success) {
        qhToast.success('Education deleted successfully');
        this.getEducation();
      }
    },

    async getSkills() {
      const response = await GET_USER_SKILLS();
      if (response.success) {
        this.Skills = response.data;
      }
    },

    async updateSkills(data: Skills) {
      const response = await UPDATE_USER_SKILLS(data);
      if (response.success) {
        qhToast.success('Skills added successfully');
        await this.getSkills();
      }
    },
  },
  persist: true,
});
