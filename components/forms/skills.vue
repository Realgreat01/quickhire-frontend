<template>
  <qh-container @close="$emit('close')" title="Skills">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, updateUserDetails)"
      >
        <div class="grid grid-cols-1 gap-4">
          <qh-input
            label="Stack"
            name="stack"
            placeholder="Frontend Developer"
            v-model="skills.stack"
            :rules="ValidationRules.skills.stack"
          />

          <qh-input
            label="Top Skills"
            type="select"
            name="top_skills"
            hint="Select your top 3 skills, useful in your job search!"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            :taggable="true"
            :max="3"
            :options="topSkills"
            group-values="skills"
            group-label="category"
            :group-select="true"
            v-model="skills.top_skills"
          />
          <qh-input
            label="Programming Languages"
            type="select"
            name="programming_languages"
            placeholder="JavaScript"
            label-name="name"
            track-by="name"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            :options="skillIcons"
            v-model="skills.programming_languages"
          />
          <qh-input
            label="Frameworks"
            type="select"
            name="frameworks"
            placeholder="Vue Js"
            label-name="name"
            track-by="name"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            :options="skillIcons"
            v-model="skills.frameworks"
          />
          <qh-input
            label="Technologies"
            type="select"
            name="technologies"
            placeholder="VS Code"
            no-data-message="Kindly suggest such to us!"
            multiple
            label-name="name"
            track-by="name"
            :options="skillIcons"
            v-model="skills.technologies"
          />
          <qh-input
            label="Others"
            name="others"
            hint="only used in your resume"
            type="select"
            multiple
            :options="skills.others"
            taggable
            placeholder="Microsoft Word"
            v-model="skills.others"
          />

          <qh-input
            label="Soft Skills"
            name="soft_skills"
            type="select"
            multiple
            taggable
            placeholder="Team Work"
            hint="only used in your resume"
            generateNewTag
            :options="skills.soft_skills"
            v-model="skills.soft_skills"
          />
        </div>

        <qh-button
          type="submit"
          class="mt-4 !h-12 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>

    <!--  -->
  </qh-container>
</template>

<script setup lang="ts">
import { UPDATE_USER_SKILLS } from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import { useUserStore } from '~/store/user-store';
import { skillIcons } from '~/constants/skill';
import type { Skills } from '~/types/user';

const { getSkills } = useUserStore();
const { skills: userSkills } = storeToRefs(useUserStore());

const skills = ref<Skills | any>({
  stack: userSkills.value?.stack,
  top_skills: userSkills.value?.top_skills,
  programming_languages: userSkills.value?.programming_languages,
  frameworks: userSkills.value?.frameworks,
  technologies: userSkills.value?.technologies,
  others: userSkills.value?.others,
  soft_skills: userSkills.value?.soft_skills,
});

const updateUserDetails = async (field: any) => {
  const response = await UPDATE_USER_SKILLS(skills.value);
  if (response.success) {
    qhToast.success('Skills updated successfully');
    await getSkills();
    qhCloseModal();
  } else qhToast.error(response.message);
};

const topSkills = ref([
  {
    category: 'Software Development',
    skills: [
      'Software Development',
      'Software Development',
      'Frontend Development',
      'Backend Development',
      'Fullstack Development',
      'Web Development',
      'WordPress Development',
      'Mobile Development',
      'Game Development',
      'E-commerce Development',
      'Low-Code/No-Code Development',
      'Voice Application Development',
      'Wearable Technology Development',
      'Robotics',
      'Agile Methodologies',
      'Lean Development',
      'Test-Driven Development (TDD)',
      'Behavior-Driven Development (BDD)',
      'Continuous Improvement',
      'Code Review',
      'Technical Writing',
      'API Documentation',
      'Debugging',
      'Performance Tuning',
      'Scalability Planning',
      'Disaster Recovery Planning',
      'Compliance & Regulatory Standards',
    ],
  },
  {
    category: 'Programming Languages',
    skills: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
      'C#',
      'Ruby',
      'Go',
      'Rust',
      'Swift',
      'Kotlin',
      'PHP',
      'Scala',
      'Perl',
      'R',
      'Dart',
      'Lua',
      'Elixir',
      'Clojure',
      'Haskell',
      'Objective-C',
    ],
  },
  {
    category: 'Frontend Development',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React.js',
      'Vue.js',
      'Angular',
      'Svelte',
      'Next.js',
      'Nuxt.js',
      'Ember.js',
      'Backbone.js',
      'jQuery',
      'Tailwind CSS',
      'Bootstrap',
      'Material-UI',
      'Ant Design',
      'Responsive Design',
      'Cross-Browser Compatibility',
      'Progressive Web Apps (PWAs)',
    ],
  },
  {
    category: 'Backend Development',
    skills: [
      'Node.js',
      'Express.js',
      'Django',
      'Flask',
      'Ruby on Rails',
      'Laravel',
      'Spring Boot',
      'ASP.NET Core',
      'NestJS',
      'Phoenix (Elixir)',
      'Koa.js',
      'Microservices Architecture',
      'Service-Oriented Architecture (SOA)',
      'GraphQL APIs',
      'RESTful APIs',
      'gRPC',
    ],
  },
  {
    category: 'Fullstack Development',
    skills: [
      'Fullstack Development',
      'MEAN Stack',
      'MERN Stack',
      'LAMP Stack',
      'LEMP Stack',
      'Django + React',
      'Ruby on Rails + React',
      'Spring Boot + Angular',
      'Server-Side Rendering (SSR)',
      'API Development & Integration',
    ],
  },
  {
    category: 'Web Development',
    skills: [
      'Web Development',
      'Progressive Web Apps (PWAs)',
      'Single Page Applications (SPAs)',
      'Responsive Design',
      'SEO Best Practices',
      'Accessibility (a11y)',
      'Web Performance Optimization',
      'Cross-Browser Compatibility',
      'Content Management Systems (CMS)',
      'Static Site Generators',
    ],
  },
  {
    category: 'Mobile Development',
    skills: [
      'Mobile Development',
      'React Native',
      'Flutter',
      'Swift (iOS)',
      'Kotlin (Android)',
      'Dart',
      'Xamarin',
      'Ionic',
      'Cordova',
      'NativeScript',
      'Mobile UI/UX Design',
      'App Store Optimization (ASO)',
    ],
  },
  {
    category: 'Databases & Data Management',
    skills: [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Firebase',
      'SQLite',
      'Cassandra',
      'DynamoDB',
      'CouchDB',
      'Elasticsearch',
      'MariaDB',
      'Neo4j',
      'GraphQL',
      'Firebase Firestore',
      'Data Warehousing',
      'ETL (Extract, Transform, Load)',
      'Data Modeling',
      'NoSQL Databases',
      'SQL Databases',
    ],
  },
  {
    category: 'DevOps & Cloud Computing',
    skills: [
      'Docker',
      'Kubernetes',
      'AWS (Amazon Web Services)',
      'Azure',
      'Google Cloud Platform (GCP)',
      'Terraform',
      'Jenkins',
      'GitLab CI/CD',
      'GitHub Actions',
      'CircleCI',
      'Ansible',
      'Puppet',
      'Chef',
      'CloudFormation',
      'Vagrant',
      'Helm',
      'Docker Swarm',
      'OpenShift',
      'Helm Charts',
    ],
  },
  {
    category: 'Version Control & Collaboration',
    skills: [
      'Git',
      'GitHub',
      'GitLab',
      'Bitbucket',
      'Mercurial',
      'SVN (Subversion)',
      'SourceTree',
      'Azure DevOps',
      'Collaborative Coding',
      'Pull Requests',
      'Code Review',
    ],
  },
  {
    category: 'Data Science & Machine Learning',
    skills: [
      'TensorFlow',
      'PyTorch',
      'Scikit-Learn',
      'Pandas',
      'NumPy',
      'Keras',
      'Apache Spark',
      'Hadoop',
      'Tableau',
      'Power BI',
      'Jupyter Notebooks',
      'MATLAB',
      'SAS',
      'RStudio',
      'Data Visualization',
      'Statistical Analysis',
      'Deep Learning',
      'Reinforcement Learning',
      'Natural Language Processing (NLP)',
      'Machine Learning Algorithms',
    ],
  },
  {
    category: 'Cybersecurity',
    skills: [
      'Penetration Testing',
      'Ethical Hacking',
      'Network Security',
      'Cryptography',
      'Security Information and Event Management (SIEM)',
      'Vulnerability Assessment',
      'Firewalls & VPNs',
      'Incident Response',
      'Security Auditing',
      'Malware Analysis',
      'Application Security',
      'Identity and Access Management (IAM)',
      'Data Encryption',
    ],
  },
  {
    category: 'Blockchain & Cryptocurrency',
    skills: [
      'Solidity',
      'Ethereum',
      'Hyperledger',
      'Smart Contracts',
      'Web3.js',
      'Truffle',
      'Bitcoin',
      'Binance Smart Chain',
      'Cardano',
      'Polkadot',
      'Decentralized Applications (dApps)',
      'Blockchain Development',
      'Consensus Algorithms',
    ],
  },
  {
    category: 'Artificial Intelligence & Natural Language Processing',
    skills: [
      'OpenAI APIs',
      'Natural Language Toolkit (NLTK)',
      'GPT Models',
      'Chatbot Development',
      'Computer Vision (OpenCV)',
      'Deep Learning',
      'Reinforcement Learning',
      'Natural Language Processing (NLP)',
      'Speech Recognition',
      'AI Model Deployment',
      'AI Ethics',
    ],
  },
  {
    category: 'Game Development',
    skills: [
      'Unity 3D',
      'Unreal Engine',
      'Godot',
      'Blender (3D Modeling)',
      'Cocos2d',
      'Game Physics',
      'Game Scripting',
      'Level Design',
      'Animation',
      'Virtual Reality (VR) Integration',
    ],
  },
  {
    category: 'UI/UX Design',
    skills: [
      'Figma',
      'Adobe XD',
      'Sketch',
      'InVision',
      'Balsamiq',
      'Zeplin',
      'Axure RP',
      'Marvel App',
      'Framer',
      'User Research',
      'Wireframing',
      'Prototyping',
      'User Testing',
      'Responsive Design',
      'Interaction Design',
    ],
  },
  {
    category: 'Big Data & Analytics',
    skills: [
      'Apache Kafka',
      'Apache Hadoop',
      'Apache Hive',
      'Apache Flink',
      'Spark',
      'BigQuery',
      'Data Warehousing',
      'ETL (Extract, Transform, Load)',
      'Data Visualization',
      'Data Mining',
      'Real-Time Data Processing',
      'Predictive Analytics',
    ],
  },
  {
    category: 'Project Management & Collaboration Tools',
    skills: [
      'Jira',
      'Trello',
      'Asana',
      'Monday.com',
      'ClickUp',
      'Slack',
      'Microsoft Teams',
      'Basecamp',
      'Notion',
      'Confluence',
      'Kanban Boards',
      'Gantt Charts',
      'Task Management',
      'Team Communication',
    ],
  },
  {
    category: 'Networking & System Administration',
    skills: [
      'Linux/Unix',
      'Windows Server',
      'Active Directory',
      'Cisco Networking',
      'Wireshark',
      'VMware',
      'OpenStack',
      'Nagios',
      'Zabbix',
      'Pfsense',
      'Network Configuration',
      'System Monitoring',
      'Virtualization',
      'Server Maintenance',
    ],
  },
  {
    category: 'Microservices & Architecture',
    skills: [
      'Microservices Architecture',
      'Service-Oriented Architecture (SOA)',
      'API Development & Integration',
      'GraphQL APIs',
      'RESTful APIs',
      'gRPC',
      'Domain-Driven Design (DDD)',
      'Event-Driven Architecture',
      'Monolithic to Microservices Migration',
    ],
  },
  {
    category: 'Containerization & Orchestration',
    skills: [
      'Containerization',
      'Docker',
      'Docker Swarm',
      'Kubernetes',
      'OpenShift',
      'Helm Charts',
      'Container Networking',
      'Container Security',
      'Orchestration Automation',
    ],
  },
  {
    category: 'Infrastructure as Code (IaC)',
    skills: [
      'Terraform',
      'Ansible',
      'Puppet',
      'Chef',
      'SaltStack',
      'CloudFormation',
      'Infrastructure Automation',
      'Configuration Management',
    ],
  },
  {
    category: 'Serverless Computing',
    skills: [
      'AWS Lambda',
      'Azure Functions',
      'Google Cloud Functions',
      'Serverless Framework',
      'FaaS (Function as a Service)',
      'Event-Driven Architecture',
      'API Gateway Integration',
      'Scalable Serverless Solutions',
    ],
  },
  {
    category: 'Security Specializations',
    skills: [
      'Cloud Security',
      'Web Security',
      'Application Security',
      'Identity and Access Management (IAM)',
      'Data Encryption',
      'Security Protocols',
      'Threat Modeling',
      'Security Compliance',
      'Risk Assessment',
    ],
  },
  {
    category: 'Extended Reality (XR)',
    skills: [
      'Augmented Reality (AR)',
      'Virtual Reality (VR)',
      'Mixed Reality (MR)',
      '3D Modeling',
      'Unity 3D',
      'Unreal Engine',
      'XR Development',
      'Holography',
      'Immersive Experiences',
    ],
  },
  {
    category: 'Continuous Integration/Continuous Deployment (CI/CD)',
    skills: [
      'Continuous Integration/Continuous Deployment (CI/CD)',
      'Jenkins',
      'Travis CI',
      'CircleCI',
      'GitHub Actions',
      'GitLab CI',
      'Automated Testing',
      'Build Automation',
      'Release Management',
    ],
  },
  {
    category: 'Emerging Technologies',
    skills: [
      'Robotics',
      'Internet of Things (IoT)',
      'Edge Computing',
      'Quantum Computing',
      'Natural User Interfaces (NUI)',
      'Gesture Control Interfaces',
      'Biometric Systems',
      'Smart Devices',
      'Autonomous Systems',
    ],
  },
  {
    category: 'Specialized Development Areas',
    skills: [
      'Chatbot Development',
      'Video Streaming & Processing',
      'Audio Processing',
      'Digital Marketing Analytics',
      'Human-Computer Interaction',
      'Natural Language Generation (NLG)',
      'Automated Testing',
      'Performance Testing',
      'Load Testing',
      'A/B Testing',
    ],
  },
  {
    category: 'Content Management Systems (CMS)',
    skills: [
      'WordPress Development',
      'Drupal Development',
      'Joomla Development',
      'Magento Development',
      'Shopify Development',
      'Content Strategy',
      'Theme Development',
      'Plugin Development',
      'CMS Customization',
    ],
  },
  {
    category: 'Search Engine Optimization (SEO) & Marketing',
    skills: [
      'Search Engine Optimization (SEO)',
      'Search Engine Marketing (SEM)',
      'Social Media Integration',
      'Content Marketing',
      'Email Marketing',
      'Pay-Per-Click (PPC) Advertising',
      'Google Analytics',
      'Conversion Rate Optimization (CRO)',
      'Marketing Automation',
    ],
  },
  {
    category: 'Business & Data Tools',
    skills: [
      'Business Intelligence',
      'Customer Relationship Management (CRM)',
      'Salesforce Development',
      'SAP',
      'Oracle ERP',
      'Microsoft Dynamics',
      'Data Analysis',
      'Reporting Tools',
      'Data Governance',
      'Data Privacy',
    ],
  },
  {
    category: 'Additional Tools & Technologies',
    skills: [
      'Blender (3D Modeling)',
      'AutoCAD',
      'SolidWorks',
      'Tableau',
      'Power BI',
      'QlikView',
      'Grafana',
      'Prometheus',
      'Splunk',
      'Logstash',
      'Kibana',
      'Elastic Stack',
      'Nagios',
      'Zabbix',
    ],
  },
  {
    category: 'Methodologies & Best Practices',
    skills: [
      'Agile Methodologies',
      'Scrum',
      'Kanban',
      'Lean Development',
      'Test-Driven Development (TDD)',
      'Behavior-Driven Development (BDD)',
      'Continuous Improvement',
      'Design Thinking',
      'DevSecOps',
      'Code Quality Assurance',
    ],
  },
  {
    category: 'Other Technical Skills',
    skills: [
      'API Documentation',
      'Technical Writing',
      'Code Review',
      'Version Control',
      'Software Testing',
      'Debugging',
      'Performance Tuning',
      'Scalability Planning',
      'Disaster Recovery Planning',
      'Compliance & Regulatory Standards',
    ],
  },
]);
</script>
