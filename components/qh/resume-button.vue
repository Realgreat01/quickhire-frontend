<template>
  <div class="">
    <qh-button @click="generatePDFTemplate()">Download Resume</qh-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
import htmlToPDFMake from 'html-to-pdfmake';
import { qhDates } from '~/composables/utils';

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
  const { projects, basicDetails, fullname, experiences, educations, stacks } =
    storeToRefs(useUserStore());

  const headerColumn = {
    alignment: 'justify',
    margin: [0, 2, 0, 24],
    columns: [
      {
        type: 'none',
        ol: [
          {
            text: fullname.value,
            alignment: 'left',
            style: 'brand',
            fontSize: 20,
          },
          'Frontend Developer | Technical Writer',
        ],
      },
      {
        alignment: 'right',
        type: 'none',
        ol: [
          basicDetails.value?.email,
          '+234 706 221 5229',
          'Ugbowo Campus, UNIBEN, Benin - City',
        ],
      },
    ],
  };

  // Experience
  const experience = experiences.value?.map((experience) => {
    const list = [
      { text: experience.company, bold: true, fontSize: 12 },
      { text: experience.role, bold: true, fontSize: 10 },
      {
        columns: [
          qhDates.shortDate(experience.startDate),
          qhDates.shortDate(experience.endDate),
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
  const project = projects.value?.map((project) => {
    const tools = project.projectTools.slice(0, 5).map((tool) => ({
      width: 'auto',
      text: tool.name,
      style: 'button',
    }));
    const list = [
      { text: project.projectName, bold: true },
      { columns: tools },
      {
        ul: [qhHtmlToPDFMake(project.projectDescription)],
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
  const education = educations.value?.map((school) => {
    const list = [
      { text: school.institution, bold: true, fontSize: 12 },
      { text: school.course },
      { text: 'Bachelors', italics: true, color: 'gray' },
      {
        columns: [
          qhDates.shortDate(school.entryDate),
          qhDates.shortDate(school.graduationDate),
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
  const programmingLanguages = stacks.value?.programmingLanguages.map(
    (language) => {
      const button = `<button style="margin:2px;">${language}</button>`;
      // return button;
      return qhHtmlToPDFMake(button);
    },
  );

  const frameworks = stacks.value?.frameworks.map((framework) => {
    const button = `<button style="margin:2px; color: #023696; ">${framework}</button>`;
    // console.log(button);
    // return button;
    return qhHtmlToPDFMake(button);
  });
  const PL = `<p>${programmingLanguages?.join('')} </p>`;
  const stack = {};
  const list = [
    // { text: school.institution, bold: true, fontSize: 12 },
    // { text: school.course },
    // { text: 'Bachelors', italics: true, color: 'gray' },
    // {
    //   columns: [
    //     qhDates.shortDate(school.entryDate),
    //     qhDates.shortDate(school.graduationDate),
    //   ],
    //   margin: [0, 0, 0, 12],
    // },
  ];
  // return list;
  // });

  console.log({ PL });
  const stackList = {
    width: 200,
    type: 'none',
    margin: [0, 10, 0, 12],
    ol: [
      { alignment: 'left', style: 'brand', text: 'SKILLS', fontSize: 16 },
      {
        columns: [
          [
            { text: 'Programming Languages', bold: true },
            {
              ul: [programmingLanguages],
              type: 'none',
              color: '#023696',
              margin: [0, 0, 0, 12],
            },
          ],
          [
            { text: 'Frameworks', bold: true },
            {
              ul: [frameworks],
              type: 'none',
              color: '#023696',
              margin: [0, 0, 0, 12],
            },
          ],
        ],
      },

      // ],

      education,
    ],
  };

  return {
    headerColumn,
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
