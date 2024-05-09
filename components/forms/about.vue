<template>
  <qh-container @close="$emit('close')" title="About">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitAboutDetails)"
      >
        <div class="grid grid-cols-1 gap-4">
          <qh-input
            label="Short Bio"
            type="text"
            name="header_bio"
            placeholder="Software Developer | Technical Writer | Builder of the Universe 🌟🎉"
            v-model="about.header_bio"
            :rules="ValidationRules.about.header_bio"
          />

          <qh-input
            label="Summary"
            type="text"
            hint="Used only in resumè"
            name="summary"
            placeholder="A software developer with over 4 years experience"
            v-model="about.summary"
            as="textarea"
            :rules="ValidationRules.about.summary"
          />
          <qh-input
            label="About"
            type="editor"
            name="about_me"
            placeholder="Hi, I am Samson Ikuomenisan a proficient VueJS developer with over 4 years experience"
            v-model="about.about_me"
            as="textarea"
            :rules="ValidationRules.about.about_me"
          />

          <qh-input
            label="Interests"
            type="tag"
            name="interests"
            placeholder="Open Source"
            v-model="about.interests"
          />

          <qh-input
            label="Hobbies"
            type="tag"
            name="hobbies"
            placeholder="Watching Movies"
            v-model="about.hobbies"
          />
        </div>
        <qh-button
          type="submit"
          class="mt-4 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>

    <!--  -->
  </qh-container>
</template>

<script setup lang="ts">
import { EDIT_USER_DETAILS } from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import type { User } from '~/types/user';

import { useUserStore } from '~/store/user-store';

const { getCurrentUser } = useUserStore();

const about = ref<User | any>({
  about_me: '',
  header_bio: '',
  summary: '',
  hobbies: [],
  interests: [],
});

const submitAboutDetails = async (field: any) => {
  const data = qhHelpers.filterEmptyValues(about.value);
  console.log({ data });
  const response = await EDIT_USER_DETAILS(data);
  if (response.success) {
    qhToast.success('Details submitted successfully');
    qhCloseModal();
    getCurrentUser();
  } else qhToast.error(response.message);
};
</script>
