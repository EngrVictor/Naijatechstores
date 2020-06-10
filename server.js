

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path'); //for 

var quoteSchema = mongoose.Schema({
	author: String,
	created_at : {type: Date , default:Date.now()},
	body: String,
	title: String
});

let quoteModel = mongoose.model('quoteModel', quoteSchema);

module.exports = quoteModel;

mongoose.connect('mongodb://ram:fakepass1@ds157742.mlab.com:57742/quoteapp');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/quotes/quotes.html'));
});

app.get('/viewquotes',function(req,res){
      res.sendFile(path.join(__dirname+'/public/viewquotes/viewquotes.html'));
});

app.post('/post',function(req,res){
  var newQuote = new quote();
  newQuote.title = req.body.title;
  newQuote.body = req.body.body;
  newQuote.author = req.body.author;
  newQuote.save(function(err,savedObject){
      if(savedObject)
      {
        res.redirect('/viewquotes')
      }
      else {
        res.send(err);
      }
});
});

app.get('/get/quotes',function(req,res){
  quote.find({},function(err,data){
    res.send(data);
  })
});

app.post('/delete/:id/quote',function(req,res){
  quote.findOneAndDelete({_id: req.params.id},function(deleteditem){
    res.redirect('/viewquotes')
  });
});

app.listen(8080);