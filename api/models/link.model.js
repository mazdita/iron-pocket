const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
  | Attribute   | Type     | Validation               |
  |-------------|----------|--------------------------|
  | url         | String   | Required, must be an URL |
  | title       | String   |                          |
  | description | String   |                          |
  | image       | String   |                          |
  | keywords    | [String] | default empty            |
 */

const linkSchema = new Schema(
  {
    // TODO: model attributes validations
  },
  {
    timestamps: true,
    // TODO: toJSON transformation
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
