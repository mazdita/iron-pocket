const createError = require('http-errors');
const urlMetadata = require('url-metadata');

//** TODO: Links CRUD actions: list, detail, create, update */


module.exports.create = (req, res, next) => {

  // We are receiving only the link url at the http request body
  // req.body => { url: "https://something.com" }
  // but we need more link's metadata before store it in the database: title, description, image...
  // With the urlMetadata library we can request the link metadata as a promise: https://www.npmjs.com/package/url-metadata#usage
  // Please don't freak out with documentation! it's just a promise!: urlMetadata(url).then(metadata => {}).catch(error => next(error))

  const url; // TODO: get the link url from request
  urlMetadata(url)
    .then(metadata => {
      // Create link's json and store at the database
    })
    .catch(error => next(error))
}
