const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const assert = require('assert');

const config = require("./config");
 
// Database Name
const dbName = 'myproject';

var mongo_client = null;

// Use connect method to connect to the server
module.exports.connect_to_mongo = function(callback) {
    MongoClient.connect(config.mongodb_host, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to mongo server");
	mongo_client = client;
	//const db = client.db(dbName);
    });
    callback();
}

module.exports.find_device = function(id, callback) {
    var db = mongo_client.db(dbName);
    var devices = db.collection("devices");
    devices.findOne({"_id": new mongo.ObjectId(id)}, (err, doc) => {
	callback(doc);
    });
}

const insertDocuments = function(docs, db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany(docs, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted documents into the collection");
        callback(result);
    });
}
