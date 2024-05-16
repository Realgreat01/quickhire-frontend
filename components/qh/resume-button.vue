<template>
  <qh-button @click="generatePDFTemplate()" v-bind="$attrs"
    ><slot>Download Resume</slot></qh-button
  >
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
import { useUtilsStore } from '~/store/utils-store';
import htmlToPDFMake from 'html-to-pdfmake';
import { qhDates } from '~/composables/utils';
import type { User } from '~/types/user';
import { GET_USER_BY_USERNAME } from '~/services/user.service';

const { getBase64Image } = useUtilsStore();
const props = defineProps({
  username: { type: String, required: true },
});

const qhHtmlToPDFMake = (html: string) =>
  htmlToPDFMake(html, {
    // removeTagClasses: true,
    removeExtraBlanks: true,
    ignoreStyles: ['color'],
    replaceText: function (text, nodes) {
      // 'nodes' contains all the parent nodes for the text
      return text.replace(/var(--tw-prose-bold)/g, ''); // it will replace any occurrence of '-' with '\\u2011' in "Lorem Ipsum is simply d-ummy text […] dummy text ever since the 1500s"
    },

    defaultStyles: {
      b: { bold: true },
      strong: { bold: true },
      u: { decoration: 'underline' },
      s: { decoration: 'lineThrough' },
      em: { italics: true },
      i: { italics: true },
      h1: { fontSize: 24, bold: true, marginBottom: 2 },
      h2: { fontSize: 22, bold: true, marginBottom: 2 },
      h3: { fontSize: 20, bold: true, marginBottom: 2 },
      h4: { fontSize: 18, bold: true, marginBottom: 2 },
      h5: { fontSize: 16, bold: true, marginBottom: 2 },
      h6: { fontSize: 14, bold: true, marginBottom: 2 },
      a: { color: 'blue', decoration: 'underline' },
      strike: { decoration: 'lineThrough' },
      p: { margin: [0, 2, 0, 2] },
      ul: { marginBottom: 2 },
      li: { marginLeft: 2 },
      table: { marginBottom: 2 },
      th: { bold: true, fillColor: '#EEEEEE' },
    },
  });
const fullname = ref('');
let user = <User | null>null;

const DefaultContent = async () => {
  const response = await GET_USER_BY_USERNAME(props.username);
  if (response.success) {
    user = response.data;
    fullname.value = user?.firstname + ' ' + user?.lastname;
  }

  const headerColumn = {
    alignment: 'justify',
    margin: [0, 2, 0, 24],
    columns: [
      {
        type: 'none',
        ol: [
          {
            text: `${user?.firstname} ${user?.lastname} `,
            alignment: 'left',
            style: 'brand',
            margin: [0, 50, 0, 0],
            fontSize: 20,
          },
          user?.header_bio,
          {
            columnGap: 10,
            columns: [
              {
                text: 'Github',
                link: user?.social_media.github,
                style: 'linkStyle',
                width: 45,
              },
              {
                text: 'Portfolio',
                link: window.location.origin + '/' + user?.username,
                style: 'linkStyle',
                width: 45,
              },
            ],
          },
        ],
      },
      {
        alignment: 'right',
        type: 'none',
        ol: [
          {
            image: await getBase64Image(user?.profile_picture as string),
            width: 50,
            height: 50,
            margin: [0, 0, 0, 0], // Top margin of 20
          },
          user?.email,
          user?.phone_number ?? '',
          `${user?.address?.street ?? ''} ${user?.address?.state}, ${user?.address.country}`,
        ],
      },
    ],
  };
  const SummaryColumn = {
    alignment: 'justify',
    width: 200,
    type: 'none',
    margin: [0, 10, 0, 12],
    ol: [
      {
        alignment: 'left',
        style: 'brand',
        text: 'PROFILE SUMMARY',
        fontSize: 16,
      },
      user?.summary,
    ],
  };

  // Experience
  const experience = user?.experience.map((experience) => {
    const list = [
      { text: experience.company, bold: true, fontSize: 12 },
      { text: experience.role, bold: true, fontSize: 10 },
      {
        columns: [
          qhDates.shortDate(experience.start_date),
          qhDates.shortDate(experience.end_date),
        ],
        color: 'gray',
      },
      {
        ul: [qhHtmlToPDFMake(experience.contributions)],
        margin: [0, 0, 0, 12],
        padding: 0,
      },
    ];
    return list;
  });

  const experienceList = {
    type: 'none',
    width: 320,
    margin: [0, 10, 0, 12],
    ol: [
      { alignment: 'left', style: 'brand', text: 'EXPERIENCE', fontSize: 16 },
      experience,
    ],
  };

  // Projects
  const project = user?.projects.map((project) => {
    const tools = project.tools_used.slice(0, 5).map((tool) => tool.name + ' ');

    const list = [
      { text: project.title, bold: true, fontSize: 13 },
      {
        text: tools.join(' '),
        color: '#023696',
        margin: [0, 0, 0, 12],
      },
      {
        ul: [qhHtmlToPDFMake(project.description)],
        type: 'none',
        margin: [0, 0, 0, 12],
      },
    ];
    return list;
  });

  const projectList = {
    width: 320,
    type: 'none',
    margin: [0, 10, 0, 12],
    ol: [
      { alignment: 'left', style: 'brand', text: 'PROJECTS', fontSize: 16 },

      project,
    ],
  };

  // EDUCATION
  const education = user?.education.map((school) => {
    const list = [
      {
        text: school.institution,
        bold: true,
        fontSize: 12,
        margin: [0, 4, 0, 0],
      },
      { text: school.course },
      { text: school.type, color: '#023696' },
      {
        columns: [
          qhDates.shortDate(school.entry_date),
          qhDates.shortDate(school.graduation_date),
        ],
        color: 'gray',
        margin: [0, 0, 0, 0],
      },
      { ul: qhHtmlToPDFMake(school.description) },
    ];
    return list;
  });

  const educationList = {
    width: 200,
    type: 'none',
    margin: [0, 10, 0, 0],
    ol: [
      { alignment: 'left', style: 'brand', text: 'EDUCATION', fontSize: 16 },

      education,
    ],
  };

  // SKILLS
  const programmingLanguages = user?.skills?.programming_languages.map(
    (language) => language.name,
  );

  const frameworks = user?.skills?.frameworks.map(
    (framework) => framework.name,
  );

  const technologies = user?.skills?.technologies.map(
    (technology) => technology.name,
  );
  const softSkills = user?.skills?.soft_skills.map((skill) => skill);
  const otherSkills = user?.skills?.others.map((skill) => skill);

  const stackList = {
    width: 200,
    type: 'none',
    margin: [0, 10, 0, 12],
    ol: [
      { alignment: 'left', style: 'brand', text: 'SKILLS', fontSize: 16 },
      {
        type: 'none',
        ol: [
          [
            { text: 'Programming Languages', bold: true },

            {
              text: programmingLanguages?.join(' '),
              color: '#023696',
              margin: [0, 0, 0, 12],
            },
          ],
          [
            { text: 'Frameworks', bold: true },
            {
              text: frameworks?.join(' '),
              color: '#023696',
              margin: [0, 0, 0, 12],
            },
          ],
          [
            { text: 'Technologies', bold: true },
            {
              text: technologies?.join(' '),
              color: '#023696',
              margin: [0, 0, 0, 12],
            },
          ],
          [
            { text: 'Soft Skills', bold: true },
            {
              text: softSkills?.join(' '),
              color: '#023696',
              margin: [0, 0, 0, 12],
            },
          ],
          [
            { text: 'Other Skills', bold: true },
            {
              text: otherSkills?.join(' '),
              color: '#023696',
              margin: [0, 0, 0, 12],
            },
          ],
        ],
      },
    ],
  };

  return {
    headerColumn,
    SummaryColumn,
    experienceList,
    projectList,
    educationList,
    stackList,
  };
};

const tableLayouts = {};

const generatePDFTemplate = async () => {
  const PDFMake = usePDFMake();
  const definitions = await DefaultContent();

  PDFMake.createPdf(
    {
      content: [
        definitions.headerColumn,
        user?.settings.show_summary === true ? definitions.SummaryColumn : null,
        {
          columns: [
            {
              width: '60%',
              stack: [definitions.experienceList, definitions.projectList],
            },
            {
              width: '40%',
              stack: [definitions.educationList, definitions.stackList],
            },
          ],
        },
      ],

      info: {
        title: fullname.value + ' Resumé',
        author: 'QuickHire',
        creator: 'QuickHire',
        producer: 'QuickHire',
        keywords: 'Hiring Software Developers',
      },

      footer: {
        text: 'Generated by QuickHire',
        color: 'gray',
        alignment: 'center',
        margin: 6,
        link: window.location.origin,
        fontSize: 8,
      },

      styles: {
        brand: {
          color: '#023696',
          bold: true,
        },
        button: {
          display: 'inline',
          color: '#023696',
          padding: 4,
          borderRadius: 4,
        },
        linkStyle: {
          display: 'inline',
          color: '#023696',
          padding: 4,
          bold: true,
          borderRadius: 4,
        },
      },
      defaultStyle: {
        columnGap: 20,
        fontSize: 10,
        color: '#1E1E1E',
        font: 'Poppins',
      },
    },
    tableLayouts,
    { Poppins: useFontPresets().Poppins },
  ).open();
  return definitions;
};
</script>

<style scoped></style>
