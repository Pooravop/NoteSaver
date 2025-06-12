const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



//ROUTE 1:Get all the notes using GET: "api/notes/fetchallnotes" //login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ isPinned: -1, date: -1 });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//ROUTE 2:Add a new Note using POST: "api/notes/addnote" //login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag, color, isPinned } = req.body;
        
        //If there are errors, return Bad request and the errors:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, color, isPinned, user: req.user.id
        });
        
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//ROUTE 3:Updating an existing Note using PUT: "api/notes/updatenote" //login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag, color, isPinned } = req.body;
    try {
        //Create a newNote object:
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }
        if (color) { newNote.color = color; }
        if (typeof isPinned === 'boolean') { newNote.isPinned = isPinned; }

        //Find the note to be updated and update it:
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).json({ error: "Note not found" }); }

        //Allow update only if user owns this note:
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to update this note" });
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//ROUTE 4:Delete an existing Note using DELETE: "api/notes/deletenote" //login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it:
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).json({ error: "Note not found" }); }

        //Allow deletion only if user owns this note:
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to delete this note" });
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router  