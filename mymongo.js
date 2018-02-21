const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const assert = require('assert');

// Get mongodb host, username, etc
const config = require("./config");

// Database and Collection Names
const dbName = 'my_database';
const imgCollection = 'images';
const usrCollection = 'devices';

// Collections
var images = null;
var users = null;

// Connect to mongodb server
module.exports.connect_to_mongo = function(callback) {
    MongoClient.connect(config.mongodb_host, config.mongodb, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to mongo server at " + config.mongodb_host);
        images = client.db(dbName).collection(imgCollection);
	users = client.db(dbName).collection(usrCollection);
    });
    callback();
}

// Retrieve image
module.exports.get_image = function(id, callback) {
    images.findOne({
        "_id": id
    }, (err, doc) => {
        if (doc) {
            // Convert to buffer from a string
            doc.imgData = new Buffer.from(doc.imgData, 'base64');
        }
        callback(err, doc);
    });
}

// Save image
module.exports.save_image = function(doc, callback) {
    // Convert to string from data
    doc.imgData = doc.imgData.toString('base64');
    images.findOneAndDelete({
        _id: doc._id
    }, (err, result) => {
        images.insert(doc, (err, result) => {
            assert.equal(err, null);
            //console.log("Inserted image.");
            callback(err, result);
        });
    });
}

// Retrieve user
module.exports.get_user = function(id, callback) {
    users.findOne({_id: mongo.ObjectId(id)}, (err, doc) => {
	callback(err, doc);
    });
}
