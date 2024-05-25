<template>
  <div>
    <h1 class="qh-text-1 mb-5 mt-20">Testimonials</h1>
    <div class="flex w-full flex-wrap justify-around gap-x-2 gap-y-6">
      <div
        class=""
        v-for="(user, index) in testimonials.slice(0, 3)"
        :key="index"
        :class="index % 3 === 0 ? 'md:mt-10' : 'md:mb-10'"
      >
        <qh-card class="w-fit bg-white md:w-[380px]">
          <RiDoubleQuotesL class="h-6 w-6 fill-brand" />
          <h1 class="qh-text-4">{{ user.message }}</h1>
          <!-- <RiDoubleQuotesR class="h-6 w-6 fill-brand" /> -->
          <div class="relative mt-6 flex items-center justify-end">
            <div class="justify-self-end text-end">
              <h1 class="qh-text-4 mb-0 font-semibold text-brand">
                {{ user.name }}
              </h1>
              <h1 class="mt-0 text-sm font-normal text-dark">
                <span class="text-xs font-light"> {{ user.job_title }}, </span>
                <span class="font-medium text-secondary">{{
                  user.current_workplace
                }}</span>
              </h1>
            </div>
            <img
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt=""
              class="m-2 h-8 w-8 justify-self-end rounded-full"
            />
          </div>
        </qh-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'vue-remix-icons';
interface TestifiersType {
  name: string;
  message: string;
  picture: string;
  twitter_url: string;
  job_title: string;
  current_workplace: string;
}

defineProps({ Class: String });

const testimonials: TestifiersType[] = reactive([
  {
    name: 'Robert Johnson',
    message:
      'This job site is a gem among many. It not only provided me with numerous job options but also helped me through the application process. The team is very knowledgeable and supportive, making sure you feel confident in your job search.',
    picture: '',
    twitter_url: 'https://twitter.com/robertjohnson',
    job_title: 'Operations Manager',
    current_workplace: 'Facebook',
  },
  {
    name: 'John Taylor',
    message:
      'The support and resources offered by this job site are unmatched. From resume-building tips to interview preparation, the team was there every step of the way. I secured a position that aligns perfectly with my career aspirations thanks to their help.',
    picture: '',
    twitter_url: 'https://twitter.com/johntaylor',
    job_title: 'IT Specialist',
    current_workplace: 'Spotify',
  },
  {
    name: 'David Anderson',
    message:
      'Finding a job during a pandemic was stressful, but this site provided all the tools I needed to succeed. The regular updates and personalized job recommendations made it much easier to apply and eventually secure a position.',
    picture: '',
    twitter_url: 'https://twitter.com/davidanderson',
    job_title: 'IT Specialist',
    current_workplace: 'Apple',
  },
  {
    name: 'John Taylor',
    message:
      'I was initially skeptical about job search platforms, but this one changed my mind. I found an amazing job within a few weeks and the process was incredibly smooth. The team behind the site is very proactive in ensuring the listings are up to date and relevant.',
    picture: '',
    twitter_url: 'https://twitter.com/johntaylor',
    job_title: 'Finance Advisor',
    current_workplace: 'Spotify',
  },
  {
    name: 'James Smith',
    message:
      "I can't thank this platform enough for helping me land a dream job in a tough market. The filters and tools available made it easy to find jobs that matched my skill set and career goals. The staff was always there to help, making the whole process less daunting.",
    picture: '',
    twitter_url: 'https://twitter.com/jamessmith',
    job_title: 'Senior Data Analyst',
    current_workplace: 'Google',
  },
  {
    name: 'Patricia Miller',
    message:
      'I was initially skeptical about job search platforms, but this one changed my mind. I found an amazing job within a few weeks and the process was incredibly smooth. The team behind the site is very proactive in ensuring the listings are up to date and relevant.',
    picture: '',
    twitter_url: 'https://twitter.com/patriciamiller',
    job_title: 'Finance Advisor',
    current_workplace: 'Spotify',
  },
  {
    name: 'John Taylor',
    message:
      'Finding a job during a pandemic was stressful, but this site provided all the tools I needed to succeed. The regular updates and personalized job recommendations made it much easier to apply and eventually secure a position.',
    picture: '',
    twitter_url: 'https://twitter.com/johntaylor',
    job_title: 'Product Manager',
    current_workplace: 'Microsoft',
  },
  {
    name: 'David Anderson',
    message:
      'After months of searching, this platform helped me find a position that perfectly matches my skills. The application process was straightforward and the staff was incredibly supportive throughout my journey. I highly recommend this service to anyone looking for a serious career upgrade.',
    picture: '',
    twitter_url: 'https://twitter.com/davidanderson',
    job_title: 'Product Manager',
    current_workplace: 'Google',
  },
  {
    name: 'Robert Johnson',
    message:
      'After months of searching, this platform helped me find a position that perfectly matches my skills. The application process was straightforward and the staff was incredibly supportive throughout my journey. I highly recommend this service to anyone looking for a serious career upgrade.',
    picture: '',
    twitter_url: 'https://twitter.com/robertjohnson',
    job_title: 'Operations Manager',
    current_workplace: 'Tesla',
  },
  // {
  //   name: 'Maria Garcia',
  //   message:
  //     'This platform stood out because of its user-friendly interface and high-quality job listings. I applied to several positions and received prompt responses. The guidance and support from the team here made a huge difference in my job search.',
  //   picture: '',
  //   twitter_url: 'https://twitter.com/mariagarcia',
  //   job_title: 'IT Specialist',
  //   current_workplace: 'Netflix',
  // },
]);
</script>

<style scoped></style>
