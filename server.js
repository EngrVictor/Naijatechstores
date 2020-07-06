
'use strict';

// ================================================================
// get all the tools we need
// ================================================================
var express = require('express');
var bodyParser = require('body-parser');
// var routes = require('./routes.js');
var port = process.env.PORT || 3000;

var app = express();

// ================================================================
// setup our express application
// ================================================================
app.use('/assets', express.static(process.cwd() + '/assets'));
app.set('view engine', 'ejs');


// ================================================================
// setup routes
// ================================================================
// routes(app);

// ================================================================
// start our server
// ================================================================
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/product/:id', function(req, res) {

    let entryId = req.params.id;

    res.render('product', {'entryId': entryId});
  });

  app.get('/', function(req, res) {
      res.render('index')
  });

  app.post('/store', function(req, res) {
    res.render('store', {'received': req.body.brand});
  });


app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});