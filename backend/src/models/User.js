const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    },
    bio: {
      type: String,
      maxlength: [160, 'Bio cannot exceed 160 characters'],
      default: '',
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    googleId: {
      type: String,
      sparse: true, // Allows null values for non-Google users
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Index for faster queries
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function () {
  return {
    _id: this._id,
    username: this.username,
    avatar: this.avatar,
    bio: this.bio,
    followers: this.followers.length,
    following: this.following.length,
    isOnline: this.isOnline,
    lastSeen: this.lastSeen,
    createdAt: this.createdAt,
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
