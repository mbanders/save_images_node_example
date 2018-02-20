const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const assert = require('assert');

const config = require("./config");
 
// Database Name
const dbName = 'myproject';

var mongo_client = null;
var db = null;

// Use connect method to connect to the server
module.exports.connect_to_mongo = function(callback) {
    MongoClient.connect(config.mongodb_host, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to mongo server");
	mongo_client = client;
	db = mongo_client.db(dbName);
    });
    callback();
}

module.exports.find_image = function(id, callback) {
    console.log("finding image for " + id);
    const devices = db.collection("documents");
    devices.findOne({"user_id": new mongo.ObjectId(id)}, (err, doc) => {
        callback(err, doc);
    });
}

module.exports.find_device = function(id, callback) {
    const devices = db.collection("documents");
    devices.findOne({"user_id": new mongo.ObjectId(id)}, (err, doc) => {
	callback(doc);
    });
}

module.exports.save_data = function(docs, callback) {
    const collection = db.collection('documents');
    docs.user_id = new mongo.ObjectId(docs.user_id);
    collection.insertMany([docs], function(err, result) {
        assert.equal(err, null);
        console.log("Inserted documents into the collection");
        callback(result);
    });
}
