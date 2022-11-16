//api routes
const fs = require('fs');

module.exports = function (app) {

    // The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.

    // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function (req, res) {
        console.log("Getting Notes");
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            res.json(notes);
        });
    });

    // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    app.post("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);

            let newNote = req.body;
            let uniqueId = (notes.length).toString();
            newNote.id = uniqueId;
            console.log(newNote);
            notes.push(newNote);

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
                console.log("New note successfully added!");
            });

            res.json(notes);
        });
    });
    
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        // let notes = JSON.parse(notesData);
        let notesId = req.params.id;
        let newNotesId = 0;

        notes = notes.filter(currNote => {
            return currNote.id != notesId;
        });

        for (currNote of notes) {
            currNote.id = newNotesId.toString();
            newNotesId++;
        }

        fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
            if (err) throw err;
            console.log("Success!");
        });

        res.json(notes);
    });
});
}
