const Question = require ('../models/questions.model');
const Answer = require ('../models/answer.model');
const User = require ('../models/user.model');

module.exports.createQuestion = async (req, res) => {
  if (!req.user) {
    return res.status (401).json ({message: 'Unauthorized', success: false});
  }
  const {question, tags} = req.body;
  if (!question || !tags || tags.length == 0) {
    return res.status (400).json ({message: 'Bad Request', success: false});
  }

  const newQuestion = new Question ({
    question,
    tags,
    author: req.user.id,
  });
  try {
    const user = await User.findById (req.user.id);
    if (!user) {
      return res
        .status (404)
        .json ({message: 'User not found', success: false});
    }
    user.score += 10;
    await user.save ();
    await newQuestion.save ();
    return res
      .status (200)
      .json ({message: 'Question created successfully', success: true});
  } catch (err) {
    console.log("ERR: ", err);
    return res
      .status (500)
      .json ({message: 'Internal Server Error', success: false});
  }
};

module.exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find ({}).populate ('author answer');
    // console.log("Questions: ", questions[0].answer);
    return res.status (200).json ({
      message: 'Questions fetched successfully',
      success: true,
      questions,
    });
  } catch (err) {
    return res
      .status (500)
      .json ({message: 'Internal Server Error', success: false});
  }
};

module.exports.getQuestionOnTags = async (req, res) => {
  const {tags} = req.body;
  if (!tags || tags.length == 0) {
    return res.status (400).json ({message: 'Bad Request', success: false});
  }
  try {
    const questions = await Question.find ({tags: {$in: tags}})
      .populate ('author answer')
      .populate ('answer.author');
    return res.status (200).json ({
      message: 'Questions fetched successfully',
      success: true,
      questions,
    });
  } catch (err) {
    return res
      .status (500)
      .json ({message: 'Internal Server Error', success: false});
  }
};

module.exports.createAnswer = async (req, res) => {
  if (!req.user) {
    return res.status (401).json ({message: 'Unauthorized', success: false});
  }

  const {questionID} = req.params;
  const {answer} = req.body;
  if (!questionID || !answer) {
    return res.status (400).json ({message: 'Bad Request', success: false});
  }

  try {
    const user = await User.findById (req.user.id);
    if (!user) {
      return res
        .status (404)
        .json ({message: 'User not found', success: false});
    }
    const question = await Question.findById (questionID);
    if (!question) {
      return res
        .status (404)
        .json ({message: 'Question not found', success: false});
    }
    const newAnswer = new Answer ({
      answer,
      question: questionID,
    });
    user.score += 20;
    await user.save ();
    newAnswer.author = req.user.id;
    await newAnswer.save ();
    question.answer.push (newAnswer._id);
    await question.save ();
    return res
      .status (200)
      .json ({message: 'Answer created successfully', success: true});
  } catch (err) {
    return res
      .status (500)
      .json ({message: 'Internal Server Error', success: false});
  }
};

module.exports.getAnswersForQuestion = async (req, res) => {
  if (!req.user) {
    return res.status (401).json ({message: 'Unauthorized', success: false});
  }
  const {questionID} = req.params;
  if (!questionID) {
    return res.status (400).json ({message: 'Bad Request', success: false});
  }
  try {
    const answers = await Answer.find ({question: questionID}).populate (
      'author question'
    );
    return res
      .status (200)
      .json ({message: 'Answers fetched successfully', success: true, answers});
  } catch (err) {
    return res
      .status (500)
      .json ({message: 'Internal Server Error', success: false});
  }
};

module.exports.upvoteAnswer = async (req, res) => {
  if (!req.user) {
    return res.status (401).json ({message: 'Unauthorized', success: false});
  }
  const {answerID} = req.params;
  if (!answerID) {
    return res.status (400).json ({message: 'Bad Request', success: false});
  }

  try {
    const user = await User.findById (req.user.id);
    if (!user) {
      return res
        .status (404)
        .json ({message: 'User not found', success: false});
    }
    const answer = await Answer.findById (answerID);
    if (!answer) {
      return res
        .status (404)
        .json ({message: 'Answer not found', success: false});
    }
    const index = answer.upvotes.indexOf (req.user._id);
    if (index == -1) {
      answer.upvotes.push (req.user._id);
    } else {
      answer.upvotes.splice (index, 1);
    }
    user.score++;
    await user.save ();
    await answer.save ();
    return res
      .status (200)
      .json ({message: 'Answer upvoted successfully', success: true});
  } catch (err) {
    return res
      .status (500)
      .json ({message: 'Internal Server Error', success: false});
  }
};

module.exports.downvoteAnswer = async (req, res) => {
  if (!req.user) {
    return res.status (401).json ({message: 'Unauthorized', success: false});
  }
  const {answerID} = req.params;
  if (!answerID) {
    return res.status (400).json ({message: 'Bad Request', success: false});
  }
  try {
    const user = await User.findById (req.user.id);
    const answer = await Answer.findById (answerID);
    if (!answer) {
      return res
        .status (404)
        .json ({message: 'Answer not found', success: false});
    }

    // if this user exists in upvotes then we remove from there
    const indexUp = answer.upvotes.indexOf (req.user._id);
    if (indexUp != -1) {
      answer.upvotes.splice (indexUp, 1);
    }
    const index = answer.downvotes.indexOf (req.user._id);
    if (index == -1) {
      answer.downvotes.push (req.user._id);
    } else {
      answer.downvotes.splice (index, 1);
    }
    user.score++;
    await user.save ();
    await answer.save ();
    return res
      .status (200)
      .json ({message: 'Answer downvoted successfully', success: true});
  } catch (err) {
    return res
      .status (500)
      .json ({message: 'Internal Server Error', success: false});
  }
};
