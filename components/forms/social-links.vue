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
          :placeholder="'https://www.github.com/' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.github"
        />

        <qh-input
          label="X (formerlly Twitter)"
          name="twitter"
          :placeholder="'https://www.twitter.com/' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.twitter"
        />

        <qh-input
          label="LinkedIn"
          name="linkedin"
          :placeholder="'https://www.linkedin.com/in/' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.linkedin"
        />

        <qh-input
          label="Facebook"
          name="facebook"
          :placeholder="'https://www.facebook.com/' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.facebook"
        />

        <qh-input
          label="Instagram"
          name="instagram"
          :placeholder="'https://www.instagram.com/' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.instagram"
        />

        <qh-input
          label="YouTube"
          name="youtube"
          :placeholder="'https://www.youtube.com/' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.youtube"
        />

        <qh-input
          label="Hashnode"
          name="hashnode"
          :placeholder="'https://hashnode.com/@' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.hashnode"
        />

        <qh-input
          label="Twitch"
          name="twitch"
          :placeholder="'https://www.twitch.tv/' + QH_CONSTANTS.USERNAME"
          v-model="socialLinks.twitch"
        />

        <qh-button
          type="submit"
          class="mt-4 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </qh-container>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate';
import { useUserStore } from '~/store/user-store';
import type { User } from '~/types/user';
import { EDIT_USER_DETAILS } from '~/services/user.service';
import type { SocialLinks } from '~/types/utils';
import QH_CONSTANTS from '~/constants';

const { getCurrentUser } = useUserStore();
const { user } = storeToRefs(useUserStore());

const socialLinks = ref<SocialLinks>({
  github: user.value?.social_media?.github,
  facebook: user.value?.social_media?.facebook,
  twitter: user.value?.social_media?.twitter,
  linkedin: user.value?.social_media?.linkedin,
  instagram: user.value?.social_media?.instagram,
  youtube: user.value?.social_media?.youtube,
  hashnode: user.value?.social_media?.hashnode,
  twitch: user.value?.social_media?.twitch,
});
const submitSocialLinks = async (field: any) => {
  const response = await EDIT_USER_DETAILS({
    social_media: qhHelpers.filterEmptyValues(field),
  });
  if (response.success) {
    qhToast.success('Address submitted successfully');
    qhCloseModal();
    getCurrentUser();
  } else qhToast.error(response.message);
};
</script>

<style scoped></style>
