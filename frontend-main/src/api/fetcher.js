import _axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

/**
 * @param {string?} url
 * @param {AxiosRequestConfig['params']?} params
 */
export async function localFetcher(url, params) {
   return await _axios(url, { params })
      .then(res => res.data)
      .catch(e => {
         throw new Error(e);
      });
}

export const axios = _axios.create({
   baseURL: `${process.env.REACT_APP_API}/api`,
   headers: {
      accept: 'application/json',
   },
});

/**
 * @param {string} url
 * @param {AxiosRequestConfig?} config
 */
function fetcher(url, config) {
   return axios(url, config)
      .then(res => res.data.data)
      .catch(e => console.error(e.message));
}

export default fetcher;
