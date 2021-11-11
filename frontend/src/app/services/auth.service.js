import API from './api';

class AuthService {
  async signIn(payload) {
    const res = await API.post('/users/login', payload);
    return res.data;
  }

  /**
   * Sign Up
   * @param {Object} auth_data {}
   */
  async signUp(auth_data) {
    const res = await API.post('/users', auth_data);
    return res.data;
  }
}

const instance = new AuthService();

export default instance;
