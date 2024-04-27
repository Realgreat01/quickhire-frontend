import { ref } from 'vue';
import axios from 'axios';
interface IDocument {
  endpoint: string;
  file_type: string;
  file_name: string;
}

const exporting_data = ref(false);

export const exportDataAsDocument = async ({
  endpoint,
  file_type = 'sheet',
  file_name,
}: IDocument) => {
  try {
    exporting_data.value = true;
    const res = await axios.get(endpoint, {
      responseType: 'blob',
    });
    let blob;
    switch (file_type) {
      case 'pdf':
        blob = new Blob([res.data], {
          type: 'application/pdf',
        });
        break;
      case 'text':
        blob = new Blob([res.data], {
          type: 'text/plain',
        });
        break;
      case 'image':
        // Adjust 'image/png' or 'image/jpeg' based on the actual image type
        blob = new Blob([res.data], {
          type: 'image/png', // or 'image/jpeg'
        });
        break;
      case 'html':
        blob = new Blob([res.data], {
          type: 'text/html',
        });
        break;
      case 'json':
        blob = new Blob([res.data], {
          type: 'application/json',
        });
        break;
      case 'sheet':
        blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        break;
      case 'csv':
        blob = new Blob([res.data], {
          type: 'text/csv;charset=utf-8',
        });
        break;
      default:
        // Handle unsupported file types or provide a default action
        blob = new Blob([res.data], {
          type: 'text/plain',
        });
        break;
    }

    const fileLink = document.createElement('a');
    fileLink.href = window.URL.createObjectURL(blob);
    fileLink.setAttribute('download', 'QHR' + file_name);
    document.body.appendChild(fileLink);
    fileLink.click();

    console.log('successful');
  } catch (error) {
    console.error(error);
  } finally {
    exporting_data.value = false;
  }
};
