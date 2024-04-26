<template>
  <div>
    <h1 class="qh-text-2 mb-5 mt-20 font-bold">Job Openings</h1>

    <div class="relative grid grid-cols-[2fr,1fr] gap-2">
      <!-- Jobs -->
      <div class="flex flex-col gap-4">
        <div
          class="flex flex-col gap-y-4 rounded-lg border border-brand-50 bg-secondary-50 p-4"
          v-for="job in latestJobs"
        >
          <!-- 1 -->
          <div class="flex items-start justify-between">
            <div class="">
              <div class="flex gap-x-8">
                <h1 class="qh-text-3 font-bold text-brand">
                  {{ job.job_title }}
                </h1>
                <qh-button
                  v-if="job.isActive"
                  label="Active"
                  class="qh-text-4 h-4 rounded-full bg-green-500 px-4 font-medium"
                />

                <qh-button
                  v-else
                  label="Closed"
                  class="qh-text-4 h-4 rounded-full bg-error-600 px-4 font-medium !text-dark-100"
                />
              </div>

              <div class="flex gap-x-8">
                <qh-button
                  :label="job.job_type"
                  class="qh-text-4 h-4 rounded-full bg-brand-100 px-4 !text-brand-700"
                />
                <h1 class="qh-text-3 font-bold text-success-800">
                  {{ qhNumbers.formatCurrency(job.salary) }}
                </h1>
              </div>
            </div>
            <div class="">
              <h2 class="">
                {{ qhNumbers.formatNumber(job.salary * 0.3829) }} Applicants
              </h2>
              <qh-button
                class="h-8 w-fit rounded-full bg-secondary px-5"
                label="See Applicants"
              />
            </div>
          </div>
          <hr class="border border-dashed border-brand" />
          <div class="">
            <h1 class="qh-text-3 font-bold">Job Description</h1>
            <p class="" v-html="job.job_description"></p>
          </div>

          <hr class="my-4 border border-dashed border-brand" />

          <div class="flex justify-between">
            <div class="">
              <h1 class="qh-text-4 font-bold">Posted By</h1>
              <p class="">{{ qhDates.formatDate(job.posted_on) }}</p>
            </div>
            <div class="">
              <h1 class="qh-text-4 font-bold">Application End</h1>
              <p class="">{{ qhDates.formatDate(job.application_ends) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources -->
      <div class="sticky top-0 h-fit bg-white p-4">
        <h1 class="qh-text-2 text-center font-bold">Resources</h1>

        <h2
          class="mx-2 mt-2 rounded-lg py-2 font-semibold text-brand-800"
          v-for="(tips, index) in hrResources"
          :key="index"
        >
          <span class="mr-2 text-dark"> {{ index + 1 }}.</span>
          <a :href="tips.url" class="font-medium">{{ tips.title }}</a>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '~/types/company';

const latestJobs = ref<Job[]>([
  {
    posted_by: {
      company_name: 'Amazon',
      company_location: 'Seattle, USA',
      company_logo: '',
      company_id: 'XCD',
    },
    job_title: 'Project Manager',
    job_description:
      "<p>As a <strong>Project Manager</strong> at Amazon, based in our Seattle office, you will oversee complex projects spanning multiple teams and regions. Your primary role will be to lead project planning, scheduling, resource allocation, and project accounting, ensuring alignment with company goals. This position demands a keen ability to track project milestones and deliverables with a high level of precision.</p> <br/><p>Your expertise in using project management software tools, methodologies, and best practices will help you manage the project's scope and timeline, and interface with clients and stakeholders effectively. You will also be responsible for conducting risk assessments and managing any project issues and changes, ensuring projects are delivered within scope and on time.</p><br/><p>Effective communication skills and the ability to lead cross-functional teams are crucial, as you will coordinate with software developers and other departments to ensure that all aspects of each project are compatible.</p>",
    isActive: false,
    job_type: 'Fulltime',
    salary: 3735,
    posted_on: '2024-06-29T10:02:24.369806',
    application_ends: '2024-08-01T23:21:00.369806',
    job_duration: '2025-02-22T03:20:48.369806',
    required_skills: [
      { name: 'Project Management', icon: 'devicon-trello-plain' },
      { name: 'C++', icon: 'devicon-cplusplus-plain' },
      { name: 'Qt', icon: 'devicon-qt-plain' },
      { name: 'Microsoft Office', icon: 'devicon-microsoftoffice-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Netflix',
      company_location: 'Los Gatos, USA',
      company_logo: '',
      company_id: 'SEQ',
    },
    job_title: 'DevOps Engineer',
    job_description:
      '<strong>Role Overview:</strong> As a DevOps Engineer at our company, you will play a pivotal role in automating and optimizing our development and production environments.<br/><br/><strong>Key Responsibilities:</strong> You will be tasked with the setup and maintenance of CI/CD pipelines to support continuous integration and deployment across multiple projects. Your expertise will ensure high availability, scalability, and fault tolerance of all deployed applications and platforms. Additionally, you will lead efforts in maintaining our infrastructure as code, leveraging configuration management and orchestration tools to automate routine operations tasks.<br/><br/><strong>Technical Scope:</strong> This role requires a deep understanding of cloud architectures, software development practices, and security protocols to efficiently manage our systems. You will work closely with development teams to create automated processes for deploying and managing our applications seamlessly in different environments.',
    isActive: true,
    job_type: 'Contract',
    salary: 7985,
    posted_on: '2024-05-28T18:50:46.369806',
    application_ends: '2024-08-28T07:00:49.369806',
    job_duration: '2025-03-31T15:48:24.369806',
    required_skills: [
      { name: 'Java', icon: 'devicon-java-plain' },
      { name: 'Spring', icon: 'devicon-spring-plain' },
      { name: 'Hibernate', icon: 'devicon-hibernate-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Apple',
      company_location: 'Cupertino, USA',
      company_logo: '',
      company_id: 'OXO',
    },
    job_title: 'Backend Developer',
    job_description:
      "<strong>Position Summary:</strong> As a Backend Developer, you are responsible for developing robust backend systems that form the backbone of our global services. Your efforts are crucial in supporting our expansive digital ecosystem.<br/><br/><strong>Core Responsibilities:</strong> In this role, you will design, implement, and maintain high-quality APIs that integrate seamlessly with various front-end and backend systems. You'll manage server-side logic and database interactions, focusing on optimizing performance and scalability.<br/><br/><strong>Performance Objectives:</strong> Ensuring high performance and responsiveness to front-end requests is paramount. You will work closely with our front-end developers to ensure that the server-side and client-side entities communicate flawlessly, providing a smooth and efficient user experience.<br/><br/><strong>Technical Proficiency:</strong> This role demands expertise in modern backend technologies and frameworks. You should be proficient in coding, troubleshooting, and deployment strategies to effectively handle the lifecycle of backend services.",
    isActive: false,
    job_type: 'Fulltime',
    salary: 5429,
    posted_on: '2024-05-11T03:47:32.369806',
    application_ends: '2024-12-26T19:20:56.369806',
    job_duration: '2024-12-04T04:49:55.369806',
    required_skills: [
      { name: 'Python', icon: 'devicon-python-plain' },
      { name: 'Flask', icon: 'devicon-flask-original' },
      { name: 'Django', icon: 'devicon-django-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Amazon',
      company_location: 'Seattle, USA',
      company_logo: '',
      company_id: 'XCD',
    },
    job_title: 'Frontend Developer',
    job_description:
      '<strong>Position Summary:</strong> As a Frontend Developer, you will create engaging and interactive web applications that offer users a high-quality experience across multiple platforms.<br/><br/><strong>Core Responsibilities:</strong> You will be responsible for building the ‘client-side’ of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications.<br/><br/><strong>Performance Objectives:</strong> Optimize applications for maximum speed and scalability. Maintain brand consistency throughout design, and ensure the technical feasibility of UI/UX designs.<br/><br/><strong>Technical Skills:</strong> Proficient understanding of web markup, including HTML5, CSS3, and JavaScript frameworks such as React or Angular.',
    isActive: false,
    job_type: 'Fulltime',
    salary: 3735,
    posted_on: '2024-06-29T10:02:24.369806',
    application_ends: '2024-08-01T23:21:00.369806',
    job_duration: '2025-02-22T03:20:48.369806',
    required_skills: [
      { name: 'Ember', icon: 'devicon-ember-original-wordmark' },
      { name: 'Backbone', icon: 'devicon-backbonejs-plain' },
      { name: 'Alpine.js', icon: 'devicon-alpinejs-plain' },
      { name: 'Meteor', icon: 'devicon-meteor-plain' },
      { name: 'Express', icon: 'devicon-express-original' },
      { name: 'Feathers', icon: 'devicon-feathersjs-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Netflix',
      company_location: 'Los Gatos, USA',
      company_logo: '',
      company_id: 'SEQ',
    },
    job_title: 'Data Scientist',
    job_description:
      '<strong>Role Overview:</strong> As a Data Scientist, you will leverage big data to solve complex analytical problems, creating predictive models and algorithms that power the decision-making processes.<br/><br/><strong>Key Responsibilities:</strong> Your main tasks will include data mining using state-of-the-art methods, extending the company’s data with third party sources of information when needed. You will also process, cleanse, and verify the integrity of data used for analysis.<br/><br/><strong>Technical Expertise:</strong> Proficiency in using statistical computer languages (R, Python, SLQ, etc.) to manipulate data and draw insights from large data sets is essential. Experience with machine learning techniques and advanced analytics is a must.',
    isActive: true,
    job_type: 'Contract',
    salary: 7985,
    posted_on: '2024-05-28T18:50:46.369806',
    application_ends: '2024-08-28T07:00:49.369806',
    job_duration: '2025-03-31T15:48:24.369806',
    required_skills: [
      { name: 'Ember', icon: 'devicon-ember-original-wordmark' },
      { name: 'Backbone', icon: 'devicon-backbonejs-plain' },
      { name: 'Angular', icon: 'devicon-angularjs-plain' },
      { name: 'Next.js', icon: 'devicon-nextjs-original' },
      { name: 'Nuxt.js', icon: 'devicon-nuxtjs-plain' },
      { name: 'Feathers', icon: 'devicon-feathersjs-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Apple',
      company_location: 'Cupertino, USA',
      company_logo: '',
      company_id: 'OXO',
    },
    job_title: 'Cybersecurity Analyst',
    job_description:
      '<strong>Job Purpose:</strong> Protect our computer systems and network devices from infiltration and cyber-attacks. You will play a crucial role in securing our technology infrastructure.<br/><br/><strong>Essential Responsibilities:</strong> Monitor our networks for security breaches and investigate violations when they occur. You will also develop and implement security standards and best practices for the organization.<br/><br/><strong>Skills and Qualifications:</strong> Strong problem-solving skills, familiarity with various security tools (e.g., Anti-virus software, intrusion detection, firewalls, etc.), and experience with incident response protocols. A relevant certification in cybersecurity (e.g., CISSP, CEH) is preferred.',
    isActive: false,
    job_type: 'Fulltime',
    salary: 5429,
    posted_on: '2024-05-11T03:47:32.369806',
    application_ends: '2024-12-26T19:20:56.369806',
    job_duration: '2024-12-04T04:49:55.369806',
    required_skills: [
      { name: 'Struts', icon: 'devicon-struts-plain' },
      { name: 'Grails', icon: 'devicon-grails-plain' },
      { name: 'Vaadin', icon: 'devicon-vaadin-plain' },
      { name: 'Apache Camel', icon: 'devicon-apachecamel-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Twitter',
      company_location: 'San Francisco, USA',
      company_logo: '',
      company_id: 'ROO',
    },
    job_title: 'Network Engineer',
    job_description:
      '<strong>Role Description:</strong> As a Network Engineer, you will be responsible for designing, implementing, monitoring, and managing the local and wide area networks of our organization to ensure maximum uptime for users.<br/><br/><strong>Key Duties:</strong> Your tasks include configuring network hardware like servers, routers, and switches. You will also diagnose and resolve hardware, software, and other network and system problems.<br/><br/><strong>Technical Competencies:</strong> Experience with various network protocols, VPNs, DNS, DHCP, and network diagnostic tools is required. Certification such as CCNA or CCNP is highly regarded.',
    isActive: true,
    job_type: 'Contract',
    salary: 9620,
    posted_on: '2024-07-08T18:12:08.369806',
    application_ends: '2024-10-03T16:53:05.369806',
    job_duration: '2024-11-30T07:33:00.369806',
    required_skills: [
      { name: 'Flask', icon: 'devicon-flask-original' },
      { name: 'Pyramid', icon: 'devicon-pyramid-plain' },
      { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Netflix',
      company_location: 'Los Gatos, USA',
      company_logo: '',
      company_id: 'WDM',
    },
    job_title: 'Product Manager',
    job_description:
      "<strong>Overview:</strong> As a Product Manager, you will develop product roadmaps and oversee the development and implementation of software products.<br/><br/><strong>Main Responsibilities:</strong> Gather and prioritize product and customer requirements, define the product vision, and work closely with engineering, sales, marketing, and support to ensure revenue and customer satisfaction goals are met.<br/><br/><strong>Strategic Role:</strong> Your duties will also include ensuring that the product supports the company's overall strategy and goals.<br/><br/><strong>Requisite Skills:</strong> A strong understanding of software development and market dynamics. Excellent written and verbal communication skills are essential.",
    isActive: false,
    job_type: 'Fulltime',
    salary: 6681,
    posted_on: '2024-05-31T05:26:40.369806',
    application_ends: '2025-01-13T12:08:30.369806',
    job_duration: '2025-07-12T09:20:26.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
]);

const hrResources = ref([
  {
    title: 'Hiring Tips for Managers',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/6-tips-for-hiring-managers.aspx',
  },
  {
    title: 'Basics of Applicant Tracking System',
    url: 'https://www.naceweb.org/talent-acquisition/technology/basics-of-applicant-tracking-systems/',
  },
  {
    title: 'Effective Onboarding Strategies',
    url: 'https://hbr.org/2020/07/what-good-onboarding-looks-like',
  },
  {
    title: 'Diversity in Hiring: Best Practices',
    url: 'https://www.ncsl.org/research/labor-and-employment/diversity-in-the-workplace-overview.aspx',
  },
  {
    title: 'Legal Considerations in Recruitment',
    url: 'https://www.eeoc.gov/laws/guidance/section-12-religious-discrimination',
  },
  {
    title: 'How to Conduct Remote Interviews',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/conduct-remote-job-interviews.aspx',
  },
  {
    title: 'Building a Strong Employer Brand',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/6-tips-for-hiring-managers.aspx',
  },
  {
    title: 'Leveraging Social Media for Recruitment',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/7-tips-social-media-recruiting-strategies.aspx',
  },
  {
    title: 'Mastering Interview Techniques',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/how-to-conduct-job-interviews.aspx',
  },
  {
    title: 'Implementing Skills-based Hiring',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/how-adopt-skills-based-hiring-practices.aspx',
  },
  {
    title: 'Optimizing Employee Retention Strategies',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/employee-relations/pages/strategies-to-help-retain-employees.aspx',
  },
  {
    title: 'Understanding HR Compliance',
    url: 'https://www.shrm.org/resourcesandtools/legal-and-compliance/employment-law/pages/default.aspx',
  },
  {
    title: 'Advancing Women Leadership in the Workplace',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/behavioral-competencies/leadership-and-navigation/pages/viewpoint-women-leaders-needed-to-help-solve-the-labor-shortage.aspx',
  },
  {
    title: 'Promoting Workplace Mental Health',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/employee-relations/pages/promoting-workplace-mental-health-in-the-covid-era.aspx',
  },
]);
</script>

<style scoped></style>
