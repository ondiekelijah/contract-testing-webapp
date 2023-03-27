const axios = require("axios");

class UserService {
  constructor(api_server_url) {
    this.AXIOS = axios.create({ baseURL: api_server_url });
  }

  async getAllUsers() {
    const { data } = await this.AXIOS.get("/users");
    return data;
  }

  async getUser(id) {
    const { data } = await this.AXIOS.get(`/users/${id}`);
    return data;
  }

  async createUser(user) {
    const { data } = await this.AXIOS.post("/users", user);
    return data;
  }

  async updateUser(user) {
    const { data } = await this.AXIOS.put(`/users/${user.id}`, user);
    return data;
  }

  async deleteUser(id) {
    const { data } = await this.AXIOS.delete(`/users/${id}`);
    return data;
  }
}

module.exports = UserService;
