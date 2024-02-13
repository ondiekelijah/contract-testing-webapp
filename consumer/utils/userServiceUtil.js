// userServiceUtil.js

const UserService = require("../app/client");

function createUserService() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  return new UserService(API_URL);
}

module.exports = createUserService;
