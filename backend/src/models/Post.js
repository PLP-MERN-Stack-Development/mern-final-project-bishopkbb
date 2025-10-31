const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must have an author'],
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [2000, 'Post content cannot exceed 2000 characters'],
      trim: true,
    },
    images: [{
      type: String, // Cloudinary URLs
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Invalid image URL',
      },
    }],
    hashtags: [{
      type: String,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9_]+$/, 'Hashtags can only contain letters, numbers, and underscores'],
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ hashtags: 1 });
postSchema.index({ createdAt: -1 });

// Extract hashtags from content before saving
postSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const hashtagRegex = /#(\w+)/g;
    const matches = this.content.match(hashtagRegex);
    
    if (matches) {
      this.hashtags = matches.map(tag => tag.slice(1).toLowerCase());
      // Remove duplicates
      this.hashtags = [...new Set(this.hashtags)];
    }
  }
  next();
});

// Update likesCount when likes array changes
postSchema.pre('save', function(next) {
  if (this.isModified('likes')) {
    this.likesCount = this.likes.length;
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
