const createError = require('http-errors');
const Link = require('../models/link.model');

module.exports.exists = (req, res, next) => {
    const id = req.params.linkId || req.params.id;
    Link.findById(id)
    .then(link => {
        if(link){
            req.link = link;
            next();
        }else{
            next(createError(404,'Link not found'))
        }
    })
    .catch(error => next(error));
}