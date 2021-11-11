import Axios from 'axios';
import { config } from 'app/config/api.config';

class Api {
  constructor(baseURL) {
    this._token = null;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    this._axios = Axios.create({
      baseURL,
      headers,
      responseType: 'json',
    });
  }

  setBaseUrl(base_url) {
    this._axios.interceptors.request.use(
      async (config) => {
        config.baseURL = base_url;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this._token = token;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get token() {
    return this._token;
  }

  set token(token) {
    this._token = token;
  }

  getUserInfo() {
    return localStorage.getItem('userInfo');
  }
  setUserInfo(info) {
    localStorage.setItem('userInfo', info);
  }

  clearUserInfo() {
    return localStorage.removeItem('userInfo');
  }

  get(url, config = {}) {
    return this._axios.get(url, {
      headers: {
        'X-MDHelp-Token': this._token,
      },
      ...config,
    });
  }

  post(url, data, config = {}) {
    return this._axios.post(url, data, {
      headers: {
        'X-MDHelp-Token': this._token,
      },
      ...config,
    });
  }

  delete(url, config = {}) {
    return this._axios.delete(url, {
      headers: {
        'X-MDHelp-Token': this._token,
      },
      ...config,
    });
  }

  put(url, data, config = {}) {
    return this._axios.put(url, data, {
      headers: {
        'X-MDHelp-Token': this._token,
      },
      ...config,
    });
  }

  patch(url, data, config = {}) {
    return this._axios.patch(url, data, {
      headers: {
        'X-MDHelp-Token': this._token,
      },
      ...config,
    });
  }
}

const instance = new Api(config.API_BASE_URL);

export default instance;
