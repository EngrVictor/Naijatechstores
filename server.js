
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

let priceSplit = given => {
  let price = given.toString().split('');

  if (price.length >= 4) {
    let newPrice = price.splice(-3);
    let currentPrice = price.join('') + ',' + newPrice.join('');

    if (currentPrice.length > 7) {
      let current = currentPrice.toString().split('');
      let endPrice = current.splice(-7);
      currentPrice = current.join('') + ',' + endPrice.join('');
    }
    return currentPrice;
  }
}

let start = entry => {
  let newPrice = priceSplit(entry.fields.price);

  app.get('/product', function(req, res) {
    res.render('product', {'result': {
      data: entry,
      price: newPrice,
    }
    });
  });

  app.get('/', function(req, res) {
      res.render('index', {'result': {
        data: entry,
      }
      });
  });
}


app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});