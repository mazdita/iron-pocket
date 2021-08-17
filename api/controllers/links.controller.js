const createError = require('http-errors');
const urlMetadata = require('url-metadata');
const Link = require('../models/link.model');

//** TODO: Links CRUD actions: list, detail, create, update */
module.exports.list = (req, res, next) => {
  Link.find()
  .then(links => res.json(links))
  .catch(next);
}
module.exports.detail = (req, res, next) => {
  res.json(req.link);
}

module.exports.create = (req, res, next) => {

  // We are receiving only the link url at the http request body
  // req.body => { url: "https://something.com" }
  // but we need more link's metadata before store it in the database: title, description, image...
  // With the urlMetadata library we can request the link metadata as a promise: https://www.npmjs.com/package/url-metadata#usage
  // Please don't freak out with documentation! it's just a promise!: urlMetadata(url).then(metadata => {}).catch(error => next(error))


  //const url; // TODO: get the link url from request
  // We need validate the URL before use it at urlMetadata, we can use mongoose model validation 
  // and select the only field/fields that we need to validate (url in this case):
  // https://mongoosejs.com/docs/api.html#document_Document-validate
  link = {url} = req.body
  new Link({ url }).validate('url')
    .then(() => urlMetadata(url))
    .then(metadata => {
        // Create link's json and store at the database
        link.title = metadata.title;
        link.image = metadata.image;
        link.description =metadata.description;
        link.keywords = metadata.keywords;
        return Link.create(link)
    })
    .then((link) => {
      if(link){
        res.status(201).json(link)
      }else{
        createError(error)
      }
    })
    .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {
  const data = { url,title,description, image, keywords} = req.body;
  const link = req.link;
  Object.assign(link, data);
  link.save()
  .then(link => res.json(link))
  .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
  Link.deleteOne({_id: req.link.id})
  .then(()=> res.status(204).send())
  .catch(next)
}