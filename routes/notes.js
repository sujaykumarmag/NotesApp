const express = require('express');
const router = express.Router();
// Controller functions
const { getNotes, insertNote, updateNote, deleteNote } = require('../controllers/notes')
const { protect } = require('../middlewares/auth');

 

router
    .route('/')
    .get(protect,getNotes)
    .post(protect,insertNote)


router
    .route('/:id')
    .put(protect,updateNote)
    .delete(protect, deleteNote)


module.exports = router;