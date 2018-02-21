const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const assert = require('assert');

// Get mongodb host, username, etc
const config = require("./config");

// Database Name
const dbName = 'myproject';
const collectionName = 'images';

var images = null;

// Connect to mongodb server
module.exports.connect_to_mongo = function(callback) {
    MongoClient.connect(config.mongodb_host, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to mongo server at " + config.mongodb_host);
        images = client.db(dbName).collection(collectionName);
    });
    callback();
}

// Retrieve the image
module.exports.get_image = function(id, callback) {
    images.findOne({
        "_id": id
    }, (err, doc) => {
        callback(err, doc);
    });
}

// Save the image
module.exports.save_image = function(doc, callback) {
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