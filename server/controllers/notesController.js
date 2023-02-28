const Note = require("../models/note");

const fetchNotes = async (req, res) => {
    try {

        // find the notes
        const notes = await Note.find({ user: req.user._id });
        //respond with them
        res.json({ notes });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    };
};

const fetchNote = async (req, res) => {
    try {
        //get id off the url
        const noteId = req.params.id;

        //find the note using that id
        const note = await Note.findByOne({ _id: noteId, user: req.user._id });

        //respond with the note
        res.json({ note });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    };
};

const createNote = async (req, res) => {
    try {
        // get the sent in data off request body
        const { title, body } = req.body;


        // create a note with it
        const note = await Note.create({
            title,
            body,
            user: req.user._id,
        });

        //respond with the new note
        res.json({ note });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    };
};

const updateNote = async (req, res) => {
    try {
        //get the id off the url
        const noteId = req.params.id;

        //get the data off the req body
        const { title, body } = req.body;

        //find and update the record
        await Note.findOneAndUpdate({ _id: noteId, user: req.user._id },
            {
                title,
                body,
            });

        //find updated note
        const note = await Note.findById(noteId);


        //respond with it
        res.json({ note });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    };
};

const deleteNote = async (req, res) => {
    try {
        //get id off url
        const noteId = req.params.id;

        //delete the record 
        await Note.deleteOne({ _id: noteId, user: req.user._id });

        //respond
        res.json({ success: "Record deleted" });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    };
};

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
};