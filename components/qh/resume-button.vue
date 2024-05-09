<template>
  <qh-button @click="generatePDFTemplate()" v-bind="$attrs"
    ><slot>Download Resume</slot></qh-button
  >
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
import htmlToPDFMake from 'html-to-pdfmake';
import { qhDates } from '~/composables/utils';
import type { User } from '~/types/user';

const props = defineProps({
  user: {
    type: Object as PropType<User | null>,
    required: true,
  },
});

const qhHtmlToPDFMake = (html: string) =>
  htmlToPDFMake(html, {
    // removeTagClasses: true,
    // removeExtraBlanks: true,
    ignoreStyles: ['color'],
    replaceText: function (text, nodes) {
      // 'nodes' contains all the parent nodes for the text
      return text.replace(/var(--tw-prose-bold)/g, ''); // it will replace any occurrence of '-' with '\\u2011' in "Lorem Ipsum is simply d-ummy text […] dummy text ever since the 1500s"
    },
  });

const DefaultContent = () => {
  const user = unref(props.user);

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
            fontSize: 20,
          },
          user?.header_bio,
        ],
      },
      {
        alignment: 'right',
        type: 'none',
        ol: [
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
        type: 'none',
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
    const tools = project.tools_used.slice(0, 5).map((tool) => ({
      width: 'auto',
      text: tool.name,
      style: 'button',
    }));
    const list = [
      { text: project.title, bold: true },
      { columns: tools },
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
      { text: school.institution, bold: true, fontSize: 12 },
      { text: school.course },
      { text: 'Bachelors', italics: true, color: 'gray' },
      {
        columns: [
          qhDates.shortDate(school.entry_date),
          qhDates.shortDate(school.graduation_date),
        ],
        margin: [0, 0, 0, 12],
      },
    ];
    return list;
  });

  const educationList = {
    width: 200,
    type: 'none',
    margin: [0, 10, 0, 12],
    ol: [
      { alignment: 'left', style: 'brand', text: 'EDUCATION', fontSize: 16 },

      education,
    ],
  };

  // EDUCATION
  const programmingLanguages = user?.skills?.programming_languages.map(
    (language) => {
      const button = `<button style="margin:2px;">${language.name}</button>`;
      // return button;
      return qhHtmlToPDFMake(button);
    },
  );

  const frameworks = user?.skills?.frameworks.map((framework) => {
    const button = `<button style="margin:2px; color: #023696; ">${framework.name}</button>`;
    // return button;
    return qhHtmlToPDFMake(button);
  });

  const stackList = {
    width: 200,
    type: 'none',
    margin: [0, 10, 0, 12],
    ol: [
      { alignment: 'left', style: 'brand', text: 'SKILLS', fontSize: 16 },

      {
        ol: [
          {
            type: 'none',
            ol: [
              { text: 'Programming Languages', bold: true, type: 'none' },
              {
                ul: [programmingLanguages],
                type: 'none',
                color: '#023696',
                margin: [0, 0, 0, 12],
              },
            ],
            ul: [
              { text: 'Frameworks', bold: true, type: 'none' },
              {
                ul: [frameworks],
                type: 'none',
                color: '#023696',
                margin: [0, 0, 0, 12],
              },
            ],
          },
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

const generatePDFTemplate = async () => {
  const PDFMake = usePDFMake();
  const definitions = DefaultContent();

  PDFMake.createPdf(
    {
      content: [
        definitions.headerColumn,
        definitions.SummaryColumn,
        {
          columns: [
            [definitions.experienceList, definitions.projectList],
            [definitions.educationList, definitions.stackList],
          ],
        },
      ],
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
      },
      defaultStyle: {
        columnGap: 20,
        fontSize: 10,
        color: '#1E1E1E',
        font: 'Poppins',
      },
    },
    {},
    { Poppins: useFontPresets().Poppins },
  ).open();
  return definitions;
};
</script>

<style scoped></style>
