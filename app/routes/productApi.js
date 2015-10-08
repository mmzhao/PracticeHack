// app/routes/productApi.js

var express = require('express');
var async = require('async');
var router = express.Router();
var models = require('../models/Models'); // get all models
var utils = require(__dirname + "/utils.js");

// MIDDLEWARE
// =============================================================================
router.use(function(req, res, next) {
  console.log('Processing incoming request...');
  next();
});

// cleans out any residual objects that were floating around
router.delete('/clean', function(req, res, next) {
  // checks every schema
  async.forEachOf(models, function(model, index, callback) {
    model.remove({}, callback);
  }, function(err) {
    if(err) utils.handleResponse(null, err, 400, res);
    else res.send('cleaning done');
  });
});

// gets number of documents in the database
router.get('/count', function(req, res, next) {
  // checks every schema
  var count = 0;
  var str = '';
  async.forEachOf(models, function(model, index, callback) {
    model.find({}, function(err, docs) {
      if(err) callback(err);
      else{
        count += docs.length;
        str += model.schemaType + ": " + docs.length + " left\n";
        callback(err);
      }
    });
  }, function(err) {
    if(err) utils.handleResponse(null, err, 400, res);
    else {
      str += count + " total docs remaining";
      res.send(str);
    }
  });
  
});

// ====================
// ----- UCCE API -----
// ====================

/* Find a release of UCCE by id. */
router.param('practice', function(req, res, next, id) {
  models.Practice.findById(id).exec(function(err, practice) {
    if(err) {
      utils.handleResponse(null, err, 400, res);
    }
    else if(!practice) {
      utils.handleResponse(null, new Error('can\'t find Practice Object with id ' + id), 400, res);
    }
    else{
      req.practice = practice;
      return next();
    }
  });
});

/* GET all UCCE releases. */
router.get('/practices', function(req, res, next) {
  models.Practice.find().exec(function(err, practices) {
    if(err) {
      utils.handleResponse(null, err, 400, res);
    }
    else{
      utils.handleResponse(practices, null, 200, res);
    }
  });
});

/* GET a specific UCCE release. */
router.get('/practices/:practice', function(req, res) {
  utils.handleResponse(req.practice, null, 200, res);
});

/* POST a new release of UCCE. */
router.post('/practices', function(req, res, next) {
  var message = req.body.message;
  var newPractice = new models.Practice({
    message: message
  });

  newPractice.save(function(err, newpractice) {
    if(err) utils.handleResponse(null, err, 400, res);
    else {
      utils.handleResponse(newpractice, null, 201, res);
    }
  });
});

/* DELETE a specific UCCE release. */
router.delete('/practices/:practice', function(req, res, next) {
  req.practice.remove(function(err) {
    if(err) {
      utils.handleResponse(null, err, 400, res);
    }
    else{
      utils.handleResponse(req.practice, null, 200, res);
    }
  });
});



// export routes
module.exports = router;















