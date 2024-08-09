<template>
  <qh-container @close="$emit('close')" title="Social Links">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 grid w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitSocialLinks)"
      >
        <qh-input
          label="GitHub"
          name="github"
          :placeholder="'https://www.github.com/username'"
          v-model="socialLinks.github"
        />

        <qh-input
          label="X (formerlly Twitter)"
          name="twitter"
          :placeholder="'https://www.twitter.com/username'"
          v-model="socialLinks.twitter"
        />

        <qh-input
          label="LinkedIn"
          name="linkedin"
          :placeholder="'https://www.linkedin.com/in/username'"
          v-model="socialLinks.linkedin"
        />

        <qh-input
          label="Facebook"
          name="facebook"
          :placeholder="'https://www.facebook.com/username'"
          v-model="socialLinks.facebook"
        />

        <qh-input
          label="Instagram"
          name="instagram"
          :placeholder="'https://www.instagram.com/username'"
          v-model="socialLinks.instagram"
        />

        <qh-input
          label="YouTube"
          name="youtube"
          :placeholder="'https://www.youtube.com/username'"
          v-model="socialLinks.youtube"
        />

        <qh-input
          label="Hashnode"
          name="hashnode"
          :placeholder="'https://hashnode.com/@username'"
          v-model="socialLinks.hashnode"
        />

        <qh-input
          label="Twitch"
          name="twitch"
          :placeholder="'https://www.twitch.tv/username'"
          v-model="socialLinks.twitch"
        />

        <qh-button
          type="submit"
          class="mt-4 !h-12 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </qh-container>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import { useCompanyStore } from '~/store/company-store';
import { UPDATE_COMPANY_DETAILS } from '~/services/company.service';
import type { SocialLinks } from '~/types/utils';
import QH_CONSTANTS from '~/constants';

const { getCurrentCompany } = useCompanyStore();
const { company } = storeToRefs(useCompanyStore());

const socialLinks = ref<SocialLinks>({
  github: company.value?.social_media?.github,
  facebook: company.value?.social_media?.facebook,
  twitter: company.value?.social_media?.twitter,
  linkedin: company.value?.social_media?.linkedin,
  instagram: company.value?.social_media?.instagram,
  youtube: company.value?.social_media?.youtube,
  hashnode: company.value?.social_media?.hashnode,
  twitch: company.value?.social_media?.twitch,
});

const submitSocialLinks = async (field: any) => {
  const response = await UPDATE_COMPANY_DETAILS({
    social_media: qhHelpers.filterEmptyValues(field),
  });
  if (response.success) {
    qhToast.success('social links submitted successfully');
    qhCloseModal();
    getCurrentCompany();
  } else qhToast.error(response.message);
};
</script>

<style scoped></style>
