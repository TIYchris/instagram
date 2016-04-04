var Backbone = require('../lib/backbone-parse/backbone-parse');
var ImageModel = require('../models/image');

var ImagesCollection = Backbone.Collection.extend({
  model: ImageModel,
  _parse_class_name: 'images'
});

var Images = new ImagesCollection();

module.exports = Images;