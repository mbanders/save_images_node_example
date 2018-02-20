# save_images_node_example
Simple node webserver that lets you upload and retrieve images by user.

Run the server:
```sh
    nodejs main.js
```

It provides three urls that are followed by any valid mongo ObjectId which is used for storing and retrieving data:

* http://localhost:80/d/5a8c54d67f3a093bfff670eb
* http://localhost:80/image/5a8c54d67f3a093bfff670eb
* http://localhost:80/save/5a8c54d67f3a093bfff670eb

