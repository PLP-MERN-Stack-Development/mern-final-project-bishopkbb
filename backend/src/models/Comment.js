const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a post'],
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Comment must have an author'],
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
      trim: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    // For nested comments (Phase 2)
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ author: 1 });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
