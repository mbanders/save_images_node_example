const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const port = 80;

// Set file size limit of 20 MB
app.use(fileUpload());

app.set('view engine', 'ejs');


// Ask for file
app.get("/d/:id", (req, res) => {
    res.render('index', {id: req.params.id});
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
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
