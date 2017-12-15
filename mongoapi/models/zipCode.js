var mongoose2 = require('mongoose');

mongoose2.connect('mongodb://localhost/addressBook', {
    useMongoClient: true,
  });

 mongoose2.Promise = global.Promise;
 
 
//Define a schema
var Schema = mongoose2.Schema;

var zipCodeSchema = new Schema({
    zipcode:{
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
});

var ZipCode = module.exports = mongoose2.model('ZipCode', zipCodeSchema,'zipCodes');

module.exports.getZipCodeByZip = function(zip, callback){
    var que = {'zipcode' : zip};
    console.log(que);
    ZipCode.findOne(que, callback);
}