const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port, () => {console.log(`Database is active and node app is listening on port ${port}`)})
  }
})

