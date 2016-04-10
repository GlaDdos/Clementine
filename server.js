'use strict'

var express = require('express');
var routes = require('./app/routes/index.js');
var MongoClient = require('mongodb').MongoClient;

var app = express();

MongoClient.connect("mongodb://localhost:27017/clementinejs", function(err, db){
  if(err){
    throw new Error('Database failed to connect!');
  }else{
    console.log('MongoDB successfully connected on port 27017.')
  }


  routes(app, db);

  app.listen(3000, function(){
    console.log("Node listening on port 3000...");
  });

  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/controllers', express.static(process.cwd() + '/controllers'));

});
