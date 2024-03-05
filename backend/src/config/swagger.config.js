export default {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Paimon API Documentation",
      version: "1.0.0",
      description:
        "The API documentation of Paimon, a guest's order management platform.",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
      contact: {
        name: "Dlowji",
        url: "https://github.com/dlowji",
        email: "dev.loivo2k2@gmail.com",
      },
    },
    basePath: "/api",
    servers: [
      {
        url: "http://localhost:5000/api/",
      },
    ],
  },
  tags: [
    {
      name: "User",
      description: "API for users",
    },
    {
      name: "Kitchen",
      description: "API for users",
    },
    {
      name: "Order",
      description: "API for users",
    },
    {
      name: "Statistics",
      description: "API for users",
    },
    {
      name: "History",
      description: "API for users",
    },
  ],
  apis: [
    "src/models/*.js",
    "src/utils/helpers/*.js",
    "src/api/controllers/user/*.js",
    "src/api/controllers/user/edit/*.js",
    "src/api/controllers/user/auth/*.js",
    "src/api/controllers/table/*.js",
    "src/api/controllers/kitchen/*.js",
    "src/api/controllers/kitchen/categories/*.js",
    "src/api/controllers/kitchen/dishes/*.js",
    "src/api/controllers/order/*.js",
    "src/api/controllers/history/*.js",
    "src/api/controllers/statistics/*.js",
  ],
};
