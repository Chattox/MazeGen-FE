import axios from 'axios';

interface Params {
  baseUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  method: string;
}

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const getConfig: Params = {
  baseUrl: apiUrl || '127.0.0.1:5000',
  method: 'get',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAPI = async (url: string): Promise<any> => {
  return await axios({ ...getConfig, url: `${getConfig.baseUrl}/${url}` })
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        status: err.code,
        data: err.stack,
      };
    });
};
