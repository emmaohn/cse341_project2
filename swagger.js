const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Contacts',
    description: 'CSE341 Contacts Project',
  },
  // host: 'localhost:8080',
  host: 'cse341-project2-jojo.onrender.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
