const urlMetadata = require('url-metadata');
const links = require('../data/links.json');
const mongoose = require('mongoose');

require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropDatabase()
    .then(() => {
      // We are getting metadata for each link url with this lib: https://www.npmjs.com/package/url-metadata
      const linksWithMetadata = links.map(link => {
        return urlMetadata(link.url)
          .then(metadata => {
            console.log(metadata);
            link.title = metadata.title;
            link.image = metadata.image;
            link.description = metadata.description;
            return link;
          })
      });
      // Each metadata request is a promise, we need wait for all promises before execute the next 'then'
      return Promise.all(linksWithMetadata)
    })
    .then(links => {
      // TODO: store links at the database 
    })
    .catch(error => console.error('An error ocurred running seeds', error))
    .then(() => mongoose.disconnect())
});
