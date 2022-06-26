const router = require('express').Router();
const commentsController = require('../controllers/comments.controllers');

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

// routes pour le vote
router.patch('/:id/vote', commentsController.vote);

// routes pour les réponses
router.post('/:id/reply', commentsController.reply);
router.put('/:id/reply/:replyId', commentsController.updateReply);
router.delete('/:id/reply/:replyId', commentsController.deleteReply);

// routes pour le vote des reponses
router.patch('/:id/reply/:replyId/vote', commentsController.voteReply);

module.exports = router;
