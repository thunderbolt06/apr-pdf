import axios from 'axios';


// Define the base URL for your API
const BASE_URL = 'http://localhost:5000/api';


// Function to send a string to the backend
export const sendFreeText = async (freeText: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-free-text`, { freeText });
    return response.data;
  } catch (error) {
    console.error('Error sending free text:', error);
    throw error;
  }
};


export const sendFormValues = async (formValues: { [key: string]: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-form-values`, { formValues });
    return response.data;
  } catch (error) {
    console.error('Error sending form values:', error);
    throw error;
  }
};
