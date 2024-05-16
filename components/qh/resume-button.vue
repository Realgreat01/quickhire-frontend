<template>
  <qh-button @click="generatePDFTemplate()" v-bind="$attrs" :loading="loading"
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
const loading = ref(false);
const { getBase64Image } = useUtilsStore();
const props = defineProps({
  username: { type: String, required: true },
});

const brandColor = '#023696';
const secondaryColor = '#38b55e';

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
let user = <User | null>null;
const fullname = computed(() => user?.firstname + ' ' + user?.lastname);

const DefaultContent = async () => {
  loading.value = true;
  const response = await GET_USER_BY_USERNAME(props.username);
  if (response.success) {
    user = response.data;
  }
  if (!user) return;
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
            margin: [0, 0, 0, 0],
            width: 320,
            fontSize: 21,
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
          // {
          //   image: await getBase64Image(user?.profile_picture as string),
          //   width: 50,
          //   height: 50,
          //   margin: [0, 0, 0, 0], // Top margin of 20
          // },
          user?.email,
          user?.phone_number ?? '',
          `${user?.address?.state}, ${user?.address.country}`,
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
      { text: experience.role, bold: true, fontSize: 10, color: brandColor },
      {
        columns: [
          qhDates.shortDate(experience.start_date),
          qhDates.shortDate(experience.end_date),
        ],
        color: 'gray',
      },
      {
        ul: qhHtmlToPDFMake(experience.contributions),
        margin: [0, 0, 0, 12],
        padding: 0,
        // type: "none"
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
        color: brandColor,
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
      { text: school.type, color: brandColor },
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
  loading.value = false;
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
        definitions?.headerColumn,
        user?.settings.show_summary === true
          ? definitions?.SummaryColumn
          : null,
        {
          columns: [
            {
              width: '60%',
              stack: [definitions?.experienceList, definitions?.projectList],
            },
            {
              width: '40%',
              stack: [definitions?.educationList, definitions?.stackList],
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
        color: 'gray',
        alignment: 'center',
        width: 'auto',
        // margin: [0, 0, 0, 10],
        // fontSize: 6,
        margin: 4,
        columns: [
          { text: '', width: '*' },
          {
            width: 'auto',
            alignment: 'center',
            columnGap: 0,
            columns: [
              {
                text: 'Generated by QuickHire',
                link: window.location.origin,
                margin: [8, 0],
                width: '*',
              },
              {
                image:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABQCAYAAABRX4iyAAAABmJLR0QA/wD/AP+gvaeTAAAKc0lEQVR42u1ce3BU1Rm/ZKMSkuhUdKZ/WLUj6B+2vkJ2E16mPOqoiAI+eFZtS22nnbFKQZSi6cNpRyRIzN2bzQPIJsEQtNKWoDzsVBRRCYRpLSQkISASpqSaN68knH6/u/dsNi+ye869u3dDvpmTnbt7c+693z3fOd/3+37fUZRIiPPN7zpc6qMxTvdL1LwOp/oJfVZTq6fWTI0ZnziuNn4vwPkOlzZHSdFuVoasTMhPpAeeF+NU8+mBjxrKkG3oJ4+UN1dJUxOiW0GPlTpindp9pKAieqj2wAe9fvo69tDzZWxZ5ics/6+H2O6KelZ9oonVN7Sz5rbzDIJPHON7/J635ZB+Pv7vumn5vRXXFuNyF8a61B8qSnpM9Cjp9tIraRT9hB7gCH+Y2BSN/eDnW9iajQdZRVUD6+q6yGQE/3+gsoFlFB9kac9sYQ5XD8VV0fHTSpLnChtrKT0mxqk9Qzf7Jb/xsbOL2B/zy9mxUy3MSqmrb2F/yCtnY2YVBSrtuCNZXWy/kTZOu9vhdO/lN3rHvBLmLatkHZ1dLJyCEff33XVs3KLN3UpL1vYrKVmuyCspbf3IGJe6lm6qCzd280wve/uDGnbxIouo4PqlO2vYjTO8XGmdMcnuNcqYzKsioyhavmk0fYqbuWp8Nnt29Uespf0Cs5O0n+1g6Tmfs5ETsrtHWao6Jqx6orlgNl28BTdw6+xitr/yNLOzlB8+rc+fuF+a/JsdrqyHw6Ioeju/4GY354X3WWPLORYNglE/b8WObrOkxchaRbncLxtvh/1pw34WjfLquvJuVyNZW2mNopxqOi5wBflMOe/+h0WzFGytZFemZlujMMP0dEW9849aNhQEqzaex7CUn5k5mXdh6CI0GUqSSxZimGSn/KTvyh7LV70/bzjAhqIgwjAm/SYKkW4RUxQ5cPBL0NETL21nQ1nm/3anzxyd7nIhx5UU9QY6uG1OsR8JMFuAKMAU5q7Yzr4/t4R9a0oeGzXRo984PnGM0Am/A3WoOdFsyX00tZ4PiCu1jBDBuexxsGN45ojuzZSvm8+xVd4KdssjRSxxci5LvDc3KPwqcXIOS5iUw8Y8UsheL6pg35js3+07dJqvkJ2IdYNGD3gY86K619S39/yaPSyBHjqemgzwF09KQz9L1u4xddT/hvozzPHzoNAKA2bRg+K2M+bEeiXbq9noKfksfmIOMwkl1VscxXzXTs1nm3fVmOblf+fBAsOd0H48KHDH8Sj4IbJy5lwHW7ByF5mauUrqY6Jkyk++soudPd8pfc9vbT/C+627JIBoIJzse0+8JY1mYk65e8Em3WSsVJTfNMkskwjHkp3LAO9gUTHM8ckBMXMOBUO7sopClB83wRMWRfnNkswc15VVWNG2Kt5nZb9zly+54IOCOyVGFUwvaVEpGxVmRfE2kq57z8JSKZMEwovVWs8fuLKn9xcoIwujR+UysvDlnWEzvUuZJOYwGfl93j7en7cXPKwm0JetiJOOnhR3/DbtqLF8Mg9l0n/7A/GgH0kWI25s65GXpIlsPi6AdJWowN8ZPW2dLRTF22hyK+DfiQrSbIYbMTfQBJEp1vN6ogKHc9TEHFspK55CpqWUmBUVRAp6Xy4tJ0BZ7jp8iQSoaAiTMMleiuo2xxzh1RHYvdFPjZ+kwVPqor4VYj3ZEMaqhpe4urhCOA8JU0Y/yvismxSDzcJmLtkmPFz5MmvXdiu5Q6Iy47ky37xFICjmqxU4eOFNsaAZMAvQAzsrC0G36CrPg2uCrJZjvvLiYN3fDgt1huRFsDBLJOctUUgceJsxya9XOEfho4P1Qp0BmLOzonhbsHKn0PN9eOAkjxP3KDwePPJlk1BnQDijQVl3zd8k9HyH6xq740T6cwoHp/7XLtTZtVPyo0JZWNVE5GRDmzFnuU9CWa04aBUE+uIiFDCH2oDpiwKCRh8tCuctiPpYFApEhbJwn6K+ltFH17CyQlTWsBmGYIb6BA9msNAEPzVyE/yIMEzwX53uOcEPuw7Bug7cKQXXfNgp7Sv/3N/TKdXDHZlwwO7hztVpuVLhnD/c4YH0MkGQDPyDBJvCM4GBNLjyIrLkjYBAGoVDOECZx1CFaG6bvVH42R789VbDDLVZOkUbB6iHkQL/bIqUApTMEITLOwPBvyTPjRxW1iu1RBkzSArYJavTHzwjyqgGs8bopzoQg8/DlygcEhUwWuIneWw3qpZniTOBVhVWcB/L050Ko1QPvkTqRyoVNtVeCATyCq0STKDJi981IGXt8e4k6x2r4s1IsoL6Yxc3ArGgt6xK+FmwevabZDUKAgpxERBSZQRpc7tkeh6lChAT0vcb+hJDqAoUP4JbKUsMQQlbnE0SriLOaA9iSHLW1IEoR1U4YeP70Uk5GojzgPguFCnklCOXenhAuiSogTjp9sfNIbMlLdxsixUSI/38heAKRfHcHBwgfSwamCZJtEA66RhORHGjrIAjhTnMDpP+0rXBhXPF7/lpkrVKWnrsYOUni3HyTQ95pZbd3qvkdcSwieQow8pW9vGxQd2fGx4o4Bnop4Kldu+VyVIPhDguo/44n32ExIPHpohB2d++b/0ls1jPZXzMFftZ8IXoKVn38KIBMEnMFIQeIGqMnVWsowGDmShXaiLBLDgflbOvUCnv9dPFHOD7n93abw33Z1/8t7toIFm9K8T6Qi2Dc0xlCGGXEjjAwNEAzN1JSCbIcKMMU8UnjoFw4ne4AIEwy7Y9x3vv5xB0yyz5V58X6EdOXOrrQoVOKPxBB48tt2eh0y9f2y3Iavb04KKhfNkHw6j7UAsgVhlGJWUoLTPDs7dCsNpi5IkoDFx/VOf/LtfvqTeCqyZXnElFi77iRbcOIdtNvqj9WhhLu9fgjOrP59RmmFPNSmWxvOzXjDIVsyWr9N8SboV2kaabn5pdJ72SK8zzF3uNMKxuDxNzUVBhZ/woqBUKg0nKFheYLQ2NZ/0OZcgOq1P7ELGxFbuFPEUX6MBFZi19z/QiSRlBjk/UYcWub9Zsr5LinslXSfhhZjuuMoKUnqCyOqiCN9Wa7UOI6szDIni+2LjHqlrqUORCRxdLffodUYXVKq7Mq61RGCr0ne7Vvr1d3HoVaMmOaml4R1aOHG/yF6aH3tRNFu8OmX0nuACBO7Ih7R2JzcaAcACPk0Mosh+wfBs7Azys4xdFvAUsWyYJEozUftWsX6dXZvzoCKf6qdjq6N4dns21CEBEuSwoOoFYEtJsq4sO6nttyZopcgRYVFCIhHRVj4CaoGCK8X6kA3dJnmsCX14IrUtJzYgL64aJqAI1WDptvYll4BAAvUQIhSW/8lijzgzmiwSQDhDJ8D1+x3modsD/9ZOfBHuxIDbZPa0PDpWsjueuTijNEkc1uL0B1QQjkZuLCiuT0M9qlLbpCVDKewbjTIc0smgjWnvsPgm3A7snudwvgvdkLA5VoCL22C7Yd1yl/07ngfajFxyF+tbJO4eXHvycRVDNZS2kYFLEN0FO8POVy10c49z3Dz5/aRuVYeGZdyw62ol+FHWB2muDpr8uOwFk7mM8vkotk5T3Kwpzbhjs3/4Pm60fc02I8EUAAAAASUVORK5CYII=',
                alignment: 'center',
                link: window.location.origin,
                width: 10,
                height: 10,
                margin: 3,
                // margin: [0, 0, 0, 0],
              },
            ],
          },
          { text: '', width: '*' },
        ],
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
  ).download(fullname.value + ' Resumé');
  return definitions;
};
</script>

<style scoped></style>
