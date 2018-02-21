const express = require("express");
const fileUpload = require("express-fileupload");
const mymongo = require("./mymongo");
const app = express();
const port = 80;

// Limit file upload size to 10 MB
const max_img_mb = 10;
app.use(fileUpload({
    limits: {
        fileSize: max_img_mb * 1024 * 1024
    },
}));

app.set('view engine', 'ejs');


// Retrieve file
app.get('/image/:id', (req, res) => {
    mymongo.get_image(req.params.id, (err, doc) => {
        if (!err && doc) {
            res.contentType(doc.imgType);
            res.send(doc.imgData);
        } else {
            res.send();
        }
    });
});

// Main default page for showing image and uploading a new one
app.get("/d/:id", (req, res) => {
    mymongo.get_user(req.params.id, (err, doc) => {
	if (doc) {
            res.render('index', {
                user_id: req.params.id
            });
	} else {
            res.status(404);
	    res.send("Sorry, device not found for id " + req.params.id);
	}
    });
});


// Save file
app.post("/d/:id", (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    // You can include various keys, but
    // the required keys are: _id, imgData, imgType
    var doc = {
        firstName: "john",
        lastName: "smith",
        _id: req.params.id,
        imgData: req.files.map.data,
        imgType: req.files.map.mimetype
    }
    mymongo.save_image(doc, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('index', {
            user_id: req.params.id
        });
    });
});


// Connect to database and run web server
mymongo.connect_to_mongo(() => {
    app.listen(port, () => {
        console.log("Web server now listening on port " + port);
    });
});
