var mongoose = require('mongoose');

var addrssSchema = mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    line1:{
        type: String,
        required: true
    },
    line2:{
        type: String
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zip:{
        type: Number,
        required: true
    },
});

var newAddrssSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    line1:{
        type: String,
        required: true
    },
    line2:{
        type: String
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zip:{
        type: Number,
        required: true
    },
});

var Address = module.exports = mongoose.model('Address', addrssSchema, 'addresses');
var NewAddress = module.exports = mongoose.model('NewAddress', newAddrssSchema, 'addresses');

module.exports.getAddresses = function(callback, limit){
    Address.find(callback).limit(limit);
}

module.exports.addAddress = function(address, callback){
    delete address._id;
    console.log(address);
    NewAddress.create(address, callback);
}

module.exports.updateAddress = function(address, callback){

    var q = {name: address.name};

    var newAddress = {
        name: address.name,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        zip: address.zip
    };
    
    Address.findOneAndUpdate(q, newAddress, {new: true}, callback);
}