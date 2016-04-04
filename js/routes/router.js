var Backbone = require('../lib/backbone-parse/backbone-parse');
var indexTemplate = require('../../templates/index.html');
var imageTemplate = require('../../templates/image.html');
var editImageTemplate = require('../../templates/editImage.html');
var newImageTemplate = require('../../templates/newImage.html');
var Images = require('../collections/images');
var Image = require('../models/image');

require('font-awesome/css/font-awesome.min.css');
var icon = 0;
var $ = require('jquery');

var $image = $("#buttons");


var Router = Backbone.Router.extend({
  initialize: function () {
    Backbone.history.start();
  },
  routes: {
    '': 'index',
    'image/:imageId': 'image',
    "newImage": "newImage",
    "editImage/:imageId": "editImage"
  },
  index: function () {
    Images.fetch({
      success: function (collection){
        var data = {imagesData:collection.toJSON()}
        $("#container").html(indexTemplate(data));
      }
    });
  }
});

var router = new Router();

router.on('route:image', function (imageId){
  var image = new Image({
    objectId: imageId
  });

  image.fetch({
    success:function(image){
      $("#container").html(imageTemplate(image));
    }
  })
})

router.on('route:newImage', function(){
  $("#container").html(newImageTemplate());
})




router.on('route:editImage', function (imageId){
  var image = new Image({
    objectId: imageId
  });

  image.fetch({
    success:function(image){
      $("#container").html(editImageTemplate(image));
    }
  })
})



$('#container').on('click','.fa',function(e){
  e.preventDefault();

   icon += 1;

  var image = new Image({
    'objectId': $('#objectId').val(),
    'icon': icon
  });

  image.save({
    success: function(){}
  });
  $('.foo').html(image.icon)
});




$('#container').on('submit', '.newPhoto',function(e) {
    e.preventDefault();

    var image = new Image();

    image.set({
        'title': $("#title").val(),
        'description': $("#description").val(),
        'image': $("#image").val(),
    });


    image.save({}, {
      success: function(){
        console.log('testing');
        router.navigate('/', {trigger:true})
      }
    });

    $(".newImage").html("Saving...");
});

$('#container').on('submit', '.editImgContainer',function(e) {
    e.preventDefault();

    var image = new Image();

    image.set({
        'objectId': $("#objectId").val(),
        'title': $("#title").val(),
        'description': $("#description").val(),
        'image': $("#image").val(),
    });


    image.save({}, {
      success: function(){
        console.log('testing');
        router.navigate('/', {trigger:true})
      }
    });

    $(".newImage").html("Saving...");
});




module.exports = router;