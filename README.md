# save_images_node_example
Simple node webserver that lets you upload and retrieve images by user.

## To run the server
First create a config file `config.sh` with information on what mongo database to connect to:
```js
module.exports.mongodb_host: 'mongodb://10.0.0.20:27017'
```

That file is read by `mymongo.js` which actually connects to the mongo database.

The main webserver is run like so:
```sh
    nodejs main.js
```

That provides two urls that are followed by any valid mongo object id:

* http://localhost:80/d/5a8c54d67f3a093bfff670eb
* http://localhost:80/image/5a8c54d67f3a093bfff670eb

