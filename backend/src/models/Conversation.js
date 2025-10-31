const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    // For group chats (Phase 2)
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      trim: true,
    },
    groupAvatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });

// Validate participants
conversationSchema.pre('save', function(next) {
  if (this.participants.length < 2) {
    return next(new Error('Conversation must have at least 2 participants'));
  }
  
  // For 1-on-1 chats, ensure only 2 participants
  if (!this.isGroup && this.participants.length > 2) {
    return next(new Error('1-on-1 conversation can only have 2 participants'));
  }
  
  next();
});

// Method to check if user is participant
conversationSchema.methods.isParticipant = function(userId) {
  return this.participants.some(p => p.toString() === userId.toString());
};

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
