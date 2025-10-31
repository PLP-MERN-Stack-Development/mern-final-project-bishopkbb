const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: [true, 'Message must belong to a conversation'],
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Message must have a sender'],
      index: true,
    },
    content: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    media: {
      type: String, // Cloudinary URL
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Invalid media URL',
      },
    },
    mediaType: {
      type: String,
      enum: ['image', 'video', 'audio', 'file'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    // For message reactions (Phase 2)
    reactions: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      emoji: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });

// Validate that message has either content or media
messageSchema.pre('save', function(next) {
  if (!this.content && !this.media) {
    return next(new Error('Message must have either content or media'));
  }
  next();
});

// Auto-set readAt when isRead is set to true
messageSchema.pre('save', function(next) {
  if (this.isModified('isRead') && this.isRead && !this.readAt) {
    this.readAt = new Date();
  }
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
