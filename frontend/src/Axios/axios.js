const axios = require("axios");

const instance = axios.create({
    baseURL: "/api",
});

module.exports = instance;
