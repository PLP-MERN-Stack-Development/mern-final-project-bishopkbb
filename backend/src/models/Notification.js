const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification must have a recipient'],
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification must have a sender'],
    },
    type: {
      type: String,
      required: true,
      enum: ['follow', 'like', 'comment', 'message', 'mention', 'story_view'],
      index: true,
    },
    // Reference to related content
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story',
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });

// Auto-set readAt when isRead is set to true
notificationSchema.pre('save', function(next) {
  if (this.isModified('isRead') && this.isRead && !this.readAt) {
    this.readAt = new Date();
  }
  next();
});

// Generate notification message based on type
notificationSchema.methods.getMessage = function() {
  const messages = {
    follow: 'started following you',
    like: 'liked your post',
    comment: 'commented on your post',
    message: 'sent you a message',
    mention: 'mentioned you in a post',
    story_view: 'viewed your story',
  };
  
  return messages[this.type] || 'interacted with your content';
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
