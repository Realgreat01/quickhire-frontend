<template>
  <div class="flex flex-wrap gap-6 rounded">
    <qh-card
      v-for="(project, index) in projects"
      :key="index"
      class="flex flex-col justify-between gap-y-4 rounded-2xl p-4 shadow-xl"
    >
      <div class="my-4 font-light text-dark">
        <RiBox3Fill class="icon h-10 w-10 fill-brand" />
        <h2 class="qh-text-2 font-bold text-brand">
          {{ project.projectName }}
        </h2>
      </div>

      <div class="flex w-fit justify-start gap-4 md:flex-row md:gap-x-10">
        <a
          :href="project.githubRepo"
          class="flex h-8 w-fit items-center justify-start gap-x-2 rounded-full bg-brand-50 px-5 !text-brand"
        >
          <RiGlobalLine class="h-7 w-7 fill-brand" />
          <span class="">Preview</span>
        </a>
        <a
          :href="project.previewLink"
          class="flex h-8 w-fit items-center justify-start gap-x-2 rounded-full bg-brand-50 px-5 !text-brand"
        >
          <RiGithubFill class="h-7 w-7 fill-brand" />
          <span class="">Repository</span>
        </a>
      </div>

      <div class="md:w-3/5">
        <RiToolsFill class="icon h-6 w-6 fill-brand" />
        <!-- <p class="qh-test-3 font-semibold text-brand-800">Tools Used</p> -->
        <div class="flex flex-wrap gap-2">
          <qh-devicon
            :icon="tool"
            v-for="(tool, index) in tools"
            :key="index"
            class="colored text-2xl"
          ></qh-devicon>
        </div>
      </div>

      <div class="">
        <RiArticleFill class="icon h-6 w-6 fill-brand" />

        <p class="qh-test-3 font-semibold text-brand-800">Description</p>
        <h2 class="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ipsum
          laudantium exercitationem necessitatibus delectus soluta ea. Dolore
          quia veritatis nesciunt odio accusamus a laboriosam, sed voluptatum,
          officiis, facilis dolorem. Quas, obcaecati. Ea, autem eligendi. Quod
          voluptatum, iure ex dolore hic repudiandae aliquid, repellat, eveniet
          architecto excepturi maiores eaque ipsum repellendus delectus est quis
          itaque soluta dolorem. Consequuntur ad cupiditate ea enim recusandae
          libero modi quo soluta optio nisi unde, est quis quibusdam odio
          officia expedita dolor quae facere tenetur. Omnis, non neque iusto
          saepe reprehenderit laudantium labore odio nesciunt nemo consectetur
          asperiores molestias vitae nulla quas maxime corrupti dolorum
          accusantium veniam minima provident incidunt quod cumque. Tempora
          temporibus, dignissimos exercitationem, nesciunt voluptas eum quos rem
          sit ullam, architecto minima ipsum.
        </h2>

        <!-- <span v-html="project.projectDescription"></span> -->
      </div>

      <div class="">
        <RiLightbulbFlashFill class="icon h-6 w-6 fill-brand" />
        <p class="qh-test-3 font-semibold text-brand-800">Lessons</p>
        <h2 class="">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, quod
          fugiat! Rem harum ducimus laborum quos reprehenderit ipsum recusandae
          repellendus, tempore natus voluptatum odit, nobis a, repellat nisi
          doloremque nam libero aspernatur minima culpa dignissimos assumenda
          quae error nihil. Ratione doloremque accusantium quidem sequi, veniam
          animi id reprehenderit illum odit quasi cumque provident quisquam
          laborum at odio sed quibusdam. Numquam obcaecati voluptates magnam
          nostrum deserunt impedit eligendi sed omnis fuga. Ex, qui, consectetur
          fugit necessitatibus sapiente odio, maiores fugiat eveniet tempora cum
          magnam? Harum ea doloremque earum reprehenderit deleniti provident
          dolorum at libero ex cumque expedita modi aut veritatis iure iusto
          maxime perferendis accusantium quae sed illum, minima quibusdam
          facilis fugit soluta. Aliquam nulla ratione cumque eveniet perferendis
          blanditiis eligendi.
        </h2>
        <!-- <span v-html="project.projectLesson"></span> -->
      </div>
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  RiBox3Fill,
  RiWebhookFill,
  RiGithubFill,
  RiGlobalLine,
  RiToolsFill,
  RiLightbulbFlashFill,
  RiArticleFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.PROJECTS,
});

useHead({
  title: 'QuickHire - Projects',
});

const tools = reactive([
  { name: 'Aarch 64', icon: 'aarch64' },
  { name: 'Adonis JS', icon: 'adonisjs' },
  { name: 'Adobe AfterEffects', icon: 'aftereffects' },
  { name: 'Akka', icon: 'akka' },
  { name: 'Algolia', icon: 'algolia' },
  { name: 'Alpinejs', icon: 'alpinejs' },
  { name: 'Amazon Web Services', icon: 'amazon-web-services' },
  { name: 'Anaconda', icon: 'anaconda' },
  { name: 'Android Studio', icon: 'android-studio' },
  { name: 'Android', icon: 'android' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Angular JS', icon: 'angularjs' },
  { name: 'Angular Material', icon: 'angular-material' },
  { name: 'Ansible', icon: 'ansible' },
  { name: 'Ant Design', icon: 'ant-design' },
  { name: 'Apache', icon: 'apache' },
  { name: 'Apache Airflow', icon: 'apache-airflow' },
  { name: 'Apache Kafka', icon: 'apache-kafka' },
  { name: 'Apache Spark', icon: 'apache-spark' },
  { name: 'Apl', icon: 'apl' },
  { name: 'Appcelerator', icon: 'appcelerator' },
  { name: 'Apple', icon: 'apple' },
  { name: 'AppWrite', icon: 'appwrite' },
  { name: 'Arch Linux', icon: 'arch-linux' },
]);

const { projects } = storeToRefs(useUserStore());
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand text-brand;
}
</style>
