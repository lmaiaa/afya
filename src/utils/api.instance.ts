import axios from 'axios';
const errorMessages: Record<string, string> = {
  network_error: 'Erro de conexão',
};
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const onError = (err: unknown) => {
  if (axios.isAxiosError(err) && err.response?.data) {
    const { key, ...rest } = err.response.data as TranslatedError;
    let message = errorMessages[key];

    Object.entries(rest).forEach(([key, value]) => {
      if (errorMessages[value]) {
        message = message.replace(`{${key}}`, errorMessages[value]);
      }
    });
    console.log(message);
  }

  throw err;
};

api.interceptors.response.use(({ data }) => data, onError);

export default api;

interface TranslatedError extends Record<string, string> {
  key: string;
}
