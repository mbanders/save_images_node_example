const express = require("express");
const fileUpload = require("express-fileupload");
const mymongo = require("./mymongo");
const app = express();
const port = 80;

app.use(fileUpload());

app.set('view engine', 'ejs');


// Ask for file
app.get("/d/:id", (req, res) => {
    mymongo.find_device(req.params.id, (device) => {
	if (device) {
            res.render('index', {id: req.params.id,
    				 firstname: device.firstname});
	} else {
	    res.render('index', {id: req.params.id, firstname: "New User"});
	}
    });
});


// Save File
app.post("/save", (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    var name = "/tmp/" + req.files.map.name;
    req.files.map.mv(name, (err) => {
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
