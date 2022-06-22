const asyncHandler = require('express-async-handler');
const Notes = require('../models/Note');
const User = require('../models/User');


// @desc    :Get all notes 
// @route   :GET/api/v1/notes
// @access  :Private
exports.getNotes = asyncHandler(async (req, res) => {
    if (req.query) {
        const reQuery = { ...req.query };
        reQuery.user = req.user.id;
        const query = await Notes.find(reQuery.tags);
        if (!query) {
            throw new Error('No Notes are in The DB according to tags')
        }
    }
    const notes = await Notes.find({ user: req.user.id });
    if (!notes) {
        throw new Error('No Notes are in The DB')
    }
    res.status(200).json({ success: true, data: notes });
})


// @desc    :Insert all notes 
// @route   :POST/api/v1/notes
// @access  :Private
exports.insertNote = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new Error('Please Enter All the fields ')
    }
    const user = await User.findById(req.user.id);
    console.log(user, req.user.id);
    if (!user) {
        throw new Error('Invalid Authorization')
    }
    const notes = await Notes.create({
        heading: req.body.heading,
        content: req.body.content,
        tags:req.body.tags,
        user:req.user.id,
    });
    if (!notes) {
        throw new Error('Failed to insert Note Make sure u enter all fields')
    }
    res.json({ success: true, data: notes });
})

// @desc    :Update a note
// @route   :PUT/api/v1/notes/:id
// @access  :Private
exports.updateNote = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error('Please give the id ')
    }
    const note = await Notes.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new Error('Invalid Authorization')
    }
    if (note.user.toString() !== user.id) {
        throw new Error('User Not  Authorization')
    }
    const notes = await Notes.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!notes) {
        throw new Error('Failed to Update Note Make sure u enter all fields')
    }
    res.json({ success: true, data : notes });
})


// @desc    :Delete a note
// @route   :DELETE/api/v1/notes/:id
// @access  :Public
exports.deleteNote = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error('Please give the id ')
    }
    const note = await Notes.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new Error('Invalid Authorization')
    }
    if (note.user.toString() !== user.id) {
        throw new Error('User Not  Authorization')
    }
    const notes = await Notes.findByIdAndDelete(req.params.id);
    if (!notes) {
        throw new Error('Failed to Delete Note Make sure u enter all fields')
    }
    res.json({ success: true, data: notes });
})
