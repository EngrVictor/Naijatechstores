
'use strict';

// ================================================================
// get all the tools we need
// ================================================================
var express = require('express');
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

const contentful = require('contentful')

let client = contentful.createClient({
  space: '506rx1s4kvpq',
  accessToken: 'cpYUmV3UQjbOMBkY90P-CDkzE1cy5fpdhPdaEvfAn_g'
})

let entryId = '6Jk1gKk1upCKWfHikSRSyh';

client.getEntry(entryId)
.then((entry) => {
  start(entry);
})
.catch(console.error)


let start = entry => {
  app.get('/product', function(req, res) {
    res.render('pages/product', {'result': {
      data: entry,
    }
    });
  });

  app.get('/', function(req, res) {
      res.render('pages/index', {'result': {
        ProductName: 'name',
        age: 32,
        job: 'software developer',
      }
      });
  });
}



app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});