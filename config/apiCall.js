import axios from 'axios';
import {Config} from './config';

export const callApi = async (endpoint, method, data = null, token = null) => {
  try {
    const apiUrl = `${Config.apiEndpoint}${endpoint}`;
    const headers = {
      ...(method !== 'DELETE' && {'Content-Type': 'application/json'}),
      ...(token && {Authorization: `Bearer ${token}`}),
    };

    const response = await axios({
      url: apiUrl,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
