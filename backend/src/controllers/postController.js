const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

/**
 * @desc    Create new post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Post content is required',
      });
    }

    // Get uploaded images from multer
    const images = req.files ? req.files.map(file => file.path) : [];

    const post = await Post.create({
      author: req.user._id,
      content,
      images,
    });

    // Populate author details
    await post.populate('author', 'username avatar');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get feed (posts from followed users)
 * @route   GET /api/posts/feed
 * @access  Private
 */
const getFeed = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get posts from followed users + own posts
    const posts = await Post.find({
      author: { $in: [...req.user.following, req.user._id] },
    })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Post.countDocuments({
      author: { $in: [...req.user.following, req.user._id] },
    });

    res.status(200).json({
      success: true,
      count: posts.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
      },
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single post
 * @route   GET /api/posts/:postId
 * @access  Public
 */
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'username avatar bio');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete post
 * @route   DELETE /api/posts/:postId
 * @access  Private (own posts only)
 */
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: post._id });

    // Delete post
    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Like/Unlike post
 * @route   POST /api/posts/:postId/like
 * @access  Private
 */
const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const likeIndex = post.likes.indexOf(req.user._id);

    if (likeIndex === -1) {
      // Like post
      post.likes.push(req.user._id);
      await post.save();

      // TODO: Create notification (will implement later)

      res.status(200).json({
        success: true,
        message: 'Post liked',
        liked: true,
        likesCount: post.likesCount,
      });
    } else {
      // Unlike post
      post.likes.splice(likeIndex, 1);
      await post.save();

      res.status(200).json({
        success: true,
        message: 'Post unliked',
        liked: false,
        likesCount: post.likesCount,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get post comments
 * @route   GET /api/posts/:postId/comments
 * @access  Public
 */
const getComments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Comment.countDocuments({ post: req.params.postId });

    res.status(200).json({
      success: true,
      count: comments.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalComments: total,
      },
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add comment to post
 * @route   POST /api/posts/:postId/comments
 * @access  Private
 */
const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required',
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const comment = await Comment.create({
      post: post._id,
      author: req.user._id,
      content,
    });

    // Update post commentsCount
    post.commentsCount += 1;
    await post.save();

    await comment.populate('author', 'username avatar');

    // TODO: Create notification (will implement later)

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get posts by hashtag
 * @route   GET /api/posts/hashtag/:tag
 * @access  Public
 */
const getPostsByHashtag = async (req, res, next) => {
  try {
    const { tag } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ hashtags: tag.toLowerCase() })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Post.countDocuments({ hashtags: tag.toLowerCase() });

    res.status(200).json({
      success: true,
      hashtag: tag,
      count: posts.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
      },
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's posts
 * @route   GET /api/posts/user/:username
 * @access  Public
 */
const getUserPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: user._id })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Post.countDocuments({ author: user._id });

    res.status(200).json({
      success: true,
      count: posts.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
      },
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getFeed,
  getPost,
  deletePost,
  toggleLike,
  getComments,
  addComment,
  getPostsByHashtag,
  getUserPosts,
};
