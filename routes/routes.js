// My routes

const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // api routes

        // GET route ==> api/notes by reading the db.json file
        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        // POST route ==> /api/notes, post a new note and adds the note to the db,(db.json)
        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            notes.push(newNote);
            dbUpdate(); //  1. update json file db
            res.send(notes); // 2. refresh page

            return console.log("A new note was added " + newNote.title);
        });

        // GET A note by id
        app.get("/api/notes/:id", function (req, res) {
            res.json(notes[req.params.id]);
            res.send(notes); // refresh page
        });

        // delete a note
        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            dbUpdate();
            console.log("Note with id was deleted " + req.params.id);
            res.send(notes); // refresh page

        })

        // notes.html
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // index.html
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // update db.json file
        function dbUpdate() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}