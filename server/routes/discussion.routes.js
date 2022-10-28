const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/verifyToken.middleware');
const {createQuestion, getAllQuestions, getQuestionOnTags, createAnswer, getAnswersForQuestion, upvoteAnswer, downvoteAnswer} = require('../controllers/discussion.controller');

// @route POST /discussion/create-question
// @desc Create a new question
// @access Private
router.post('/create-question', verifyToken, createQuestion);

// @route GET /discussion/get-all-questions
// @desc Get all questions
// @access Public
router.get('/get-all-questions', getAllQuestions);

// @route GET /discussion/get-questions-on-tags
// @desc Get all questions on tags
// @access Public
router.get('/get-questions-on-tags', getQuestionOnTags);

// @route POST /discussion/create-answer/:questionID
// @desc Create a new answer
// @access Private
router.post('/create-answer/:questionID', verifyToken, createAnswer);

// @route GET /discussion/get-answers-for-question
// @desc Get all answers for a question
// @access Public
router.get('/get-answers-for-question', getAnswersForQuestion);

// @route POST /discussion/upvote-answer
// @desc Upvote an answer
// @access Private
router.post('/upvote-answer/:answerID', verifyToken, upvoteAnswer);

// @route POST /discussion/downvote-answer
// @desc Downvote an answer
// @access Private
router.post('/downvote-answer/:answerID', verifyToken, downvoteAnswer);


module.exports = router;