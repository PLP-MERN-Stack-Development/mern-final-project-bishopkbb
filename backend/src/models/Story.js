const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Story must have an author'],
      index: true,
    },
    image: {
      type: String,
      required: [true, 'Story must have an image'],
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Invalid image URL',
      },
    },
    caption: {
      type: String,
      maxlength: [200, 'Caption cannot exceed 200 characters'],
      trim: true,
      default: '',
    },
    viewers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    expiresAt: {
      type: Date,
      required: true,
      index: true,
      default: function() {
        // Story expires 24 hours from creation
        return new Date(Date.now() + 24 * 60 * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
  }
);

// TTL index - MongoDB will automatically delete expired stories
storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for faster queries
storySchema.index({ author: 1, createdAt: -1 });

// Method to check if story has expired
storySchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Method to check if user has viewed story
storySchema.methods.hasViewed = function(userId) {
  return this.viewers.some(viewer => viewer.toString() === userId.toString());
};

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
