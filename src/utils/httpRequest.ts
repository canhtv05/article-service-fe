import axios, { AxiosResponse } from 'axios';

export const httpRequest = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const handleRequest = async <T>(promise: Promise<AxiosResponse<T>>) => {
  try {
    const response = await promise;
    return response.data;
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'response' in err) {
      // @ts-expect-error: err.response có thể có kiểu bất kỳ
      return err.response?.data;
    }
  }
};
