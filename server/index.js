require('dotenv').config();
const config = require('./config.js');
const { app } = require('./src/server');

app.listen(config.port, () =>
    console.log(`Server is live @ ${config.hostUrl}`),
);
  
