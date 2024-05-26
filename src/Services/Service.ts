import axios from 'axios';


// Define the base URL for your API
const BASE_URL = 'http://192.168.1.3:5000';


// Function to send a string to the backend
export const sendFreeText = async (templateType: string, freeText: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/aiRetriever`, { "templateType": templateType, "freeText": freeText });
    return response.data;
  } catch (error) {
    console.error('Error sending free text:', error);
    throw error;
  }
};


export const sendFormValues = async (formValues: { [key: string]: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/generatePdf`, { formValues });
    return response.data;
  } catch (error) {
    console.error('Error sending form values:', error);
    throw error;
  }
};
