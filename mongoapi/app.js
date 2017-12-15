var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());

var Address = require('./models/address');
var ZipCode = require('./models/zipCode');

mongoose.connect('mongodb://localhost/addressBook', {
    useMongoClient: true,
  });
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('incomplete URL');
})

app.get('/api/addresses', function(req, res){
    Address.getAddresses(function(err,addresses){
        if (err)
            throw err;

        res.json(addresses);    
    })
})

app.post('/api/addresses', function(req, res){
    var address = req.body;
    Address.addAddress(address, function(err,address){
        if (err)
            throw err;

        res.json(address);    
    })
})

app.put('/api/addresses', function(req, res){
    var address = req.body;
    Address.updateAddress(address, function(err,address){
        
        if (err)
            throw err;

        res.json(address);    
    })
})

app.get('/api/zipCodes/:zip', function(req, res){
    ZipCode.getZipCodeByZip(req.params.zip, function(err, zipCode){
     
        if (err)
            throw err;

        res.json(zipCode);    
    })
})

app.listen(3000);
console.log('Running...');