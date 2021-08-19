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
  const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/;

  const linkSchema = new Schema(
  {
    // TODO: model attributes validations
    url:{
      type: String,
      required: 'Url is required',
      match: [URL_PATTERN, 'Url not valid']
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    img:{
      type: String,
    },
    keywords:{
      type: [String],
      default: ''
    }
  },
  {
    timestamps: true,
    // TODO: toJSON transformation
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        return ret;
        
      }
    }
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
