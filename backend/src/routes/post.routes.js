const express = require('express');
const {
  createPost,
  getFeed,
  getPost,
  deletePost,
  toggleLike,
  getComments,
  addComment,
  getPostsByHashtag,
  getUserPosts,
} = require('../controllers/postController');
const { protect, optionalAuth } = require('../middleware/auth');
const { uploadPost } = require('../config/cloudinary');

const router = express.Router();

// Protected routes
router.post('/', protect, uploadPost.array('images', 5), createPost);
router.get('/feed', protect, getFeed);
router.delete('/:postId', protect, deletePost);
router.post('/:postId/like', protect, toggleLike);
router.post('/:postId/comments', protect, addComment);

// Public routes
router.get('/hashtag/:tag', getPostsByHashtag);
router.get('/user/:username', getUserPosts);
router.get('/:postId', getPost);
router.get('/:postId/comments', getComments);

module.exports = router;
