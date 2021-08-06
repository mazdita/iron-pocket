const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iron-pocket';

mongoose.connect(MONGODB_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
  .catch(error => {
    console.error(`An error occurred trying to connect to the database ${MONGODB_URI}`, error);
    process.exit(1);
  })

process.on('SIGINT', () => {
  mongoose.disconnect()
    .catch(error => console.error('An error ocurred trying to close mongoose connection', error))
    .then(() => process.exit(0))
});
