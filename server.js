
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
  space: 'xai0al1ows0s',
  accessToken: 'O4iy74XCWHyoxSivUqhJkudOfKU0RdQTMzbsIsVWshY'
})

let entryId = '651CQ8rLoIYCeY6G0QG22q';
let entryId2 = '7LAnCobuuWYSqks6wAwY2a';

client.getEntry(entryId)
.then((entry) => console.log(entry))
.catch(console.error)

client.getEntry(entryId2)
.then((entry) => console.log(entry))
.catch(console.error)

app.get('/', function(req, res) {
        res.render('pages/index', {'result': {
          ProductName: 'name',
          age: 32,
          job: 'software developer',
        }
        });
    });

    app.get('/product', function(req, res) {
        res.render('pages/product', {'result': {
          ProductName: 'name',
          age: 32,
          job: 'software developer',
        }
        });
    });


app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});