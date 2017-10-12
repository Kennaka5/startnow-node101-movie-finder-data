const express = require('express');
const morgan = require('morgan') 
const axios = require('axios');
const fs = require('fs');


const app = express();
const cache = {}

app.use(morgan('dev'));


app.get('/', function (req, res) {
 
//break down the values of th peramaters to accept all requests 
 var id = req.query;//{t: baby driver}
 var key = Object.keys(id)[0];// seperates the object name from value of Id
 var value = id[key];// takes the value of req.query ig : babydriver

 // Gus: determine if this request has been made before (A): if request is in cache request Json Cache,
 //or perform Axios request

 if (cache.hasOwnProperty([value])) {
res.json(cache[value])
 } else { 
                  //req.query == {i: tt3896198, t: baby driver}
   axios.get('http://www.omdbapi.com/?apikey=8730e0e&'+ key + '=' + encodeURI(value) )
    .then(function (response) {
     // console.log (response.data)
      res.json(response.data);
      cache[value] = response.data; //using the const, store vaule of respose data in cache
    })
    .catch(function (error) {
      console.log(error);
      res.send('catch');
    });
  }
    });




module.exports = app;
