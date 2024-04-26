<template>
  <div class="mx-auto bg-white p-10 md:w-4/5">
    <!--  -->
    <div class="flex items-start justify-between">
      <div class="">
        <h1
          class="qh-text-2 text-stroke font-geologica font-bold capitalize text-brand"
        >
          {{ fullname }}
        </h1>
        <h1 class="qh-text-4 font-medium capitalize">
          Frontend Developer | Software Engineer | Technical Writer
        </h1>
      </div>
      <div class="block">
        <img
          src="~/assets/images/user-profile.jpg"
          alt=""
          class="block w-36 rounded-[50%] border-4 border-brand"
        />
      </div>
    </div>

    <!--  -->
    <div class="">
      <h2
        class="font-geologica text-stroke qh-text-2 font-bold uppercase text-brand"
      >
        ABOUT ME
      </h2>
      <p class="">
        With three years of professional experience in full-stack development, I
        specialize in creating dynamic and scalable web applications using
        Node.js and Vue.js. My expertise lies in efficiently building
        server-side applications with Node.js and designing responsive front-end
        user interfaces with Vue.js.
        <br />
        <br />
        Throughout my career, I have contributed to various projects that
        required a deep understanding of both front-end and back-end
        technologies, ensuring seamless integration and functionality. My
        approach to software development is rooted in best practices for code
        quality, security, and performance optimization.
        <br />
        <br />
        I am adept at working within agile environments, collaborating closely
        with team members to drive projects from conception to deployment,
        consistently meeting deadlines and exceeding client expectations. My
        passion for technology and commitment to continuous learning have
        equipped me with the tools to adapt and excel in the ever-evolving
        landscape of web development.
      </p>
    </div>

    <!--  -->
    <div class="mt-8 w-full">
      <h2
        class="font-geologica text-stroke qh-text-2 mb-2 font-bold uppercase text-brand"
      >
        STACKS
      </h2>
      <div class="grid gap-x-10 gap-y-4 md:grid-cols-2">
        <div class="bg-secondary-100 p-4">
          <h1 class="my-2 font-bold text-error-600">Programming Languages</h1>
          <div class="flex flex-wrap">
            <i
              v-for="(language, index) in programmingLanguages"
              :key="index"
              :class="language.icon"
              class="colored p-2 text-3xl"
            ></i>
          </div>
        </div>

        <div class="bg-secondary-100 p-4">
          <h1 class="my-2 font-bold text-error-600">
            Framworks and Technologies
          </h1>
          <div class="flex flex-wrap">
            <i
              v-for="(framework, index) in frameworks"
              :key="index"
              :class="framework.icon"
              class="colored p-2 text-3xl"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { fullname } = storeToRefs(useUserStore());

const frameworks = ref([
  { name: 'Ember', icon: 'devicon-ember-original-wordmark' },
  { name: 'Kitura', icon: 'devicon-kitura-plain' },
  { name: 'Perfect', icon: 'devicon-perfect-plain' },
  { name: 'Meteor', icon: 'devicon-meteor-plain' },
  { name: 'Express', icon: 'devicon-express-original' },
  { name: 'Feathers', icon: 'devicon-feathersjs-plain' },
  { name: 'Gin', icon: 'devicon-gin-plain' },
  { name: 'Spring', icon: 'devicon-spring-plain' },
  { name: 'Hibernate', icon: 'devicon-hibernate-plain' },
  { name: 'Struts', icon: 'devicon-struts-plain' },
  { name: 'Grails', icon: 'devicon-grails-plain' },
  { name: 'Vaadin', icon: 'devicon-vaadin-plain' },
  { name: 'Apache Camel', icon: 'devicon-apachecamel-plain' },
  { name: 'Dropwizard', icon: 'devicon-dropwizard-plain' },
  { name: 'Rails', icon: 'devicon-rails-plain' },
  { name: 'Sinatra', icon: 'devicon-sinatra-original' },
  { name: 'Beego', icon: 'devicon-beego-plain' },
  { name: 'Flask', icon: 'devicon-flask-original' },
  { name: 'Pyramid', icon: 'devicon-pyramid-plain' },
  { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
  { name: 'Tornado', icon: 'devicon-tornado-plain' },
]);

const programmingLanguages = ref([
  { name: 'HTML', icon: 'devicon-html5-plain' },
  { name: 'CSS', icon: 'devicon-css3-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'PHP', icon: 'devicon-php-plain' },
  { name: 'Go', icon: 'devicon-go-plain' },
  { name: 'Java', icon: 'devicon-java-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'C++', icon: 'devicon-cplusplus-plain' },
  { name: 'C#', icon: 'devicon-csharp-plain' },
  { name: 'Carbon', icon: '' },
]);
</script>

<style scoped></style>
