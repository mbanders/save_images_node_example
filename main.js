const express = require("express");
const fileUpload = require("express-fileupload");
const mymongo = require("./mymongo");
const app = express();
const port = 80;

app.use(fileUpload());

app.set('view engine', 'ejs');


// Ask for file
app.get('/image/:id', (req, res) => {
    mymongo.find_image(req.params.id, (err, doc) => {
	if (!err && doc) {
            res.contentType(doc.img_mimetype);
            res.send(new Buffer.from(doc.img_data, 'base64'));
	} else {
	    res.send();
	}
    });
});

app.get("/d/:id", (req, res) => {
    mymongo.find_device(req.params.id, (device) => {
	if (device) {
            res.render('index', {user: device});
	} else {
	    res.render('index', {user: {user_id: req.params.id, firstname: "New User"}});
	}
    });
});


// Save File
app.post("/save/:id", (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    var doc = {firstname: "john",
	       lastname: "smith",
	       user_id: req.params.id,
	       img_data: req.files.map.data.toString('base64'),
	       img_mimetype: req.files.map.mimetype
	      }
    mymongo.save_data(doc, (err) => {
	if (err) {
          return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });
});


// Run Server
mymongo.connect_to_mongo( () =>{
    app.listen(port, () => {
        console.log("Web server now listening on port " + port);
    });
});
