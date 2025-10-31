const User = require('../models/User');
const { sendTokenResponse } = require('../utils/generateToken');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password',
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      const field = userExists.email === email ? 'email' : 'username';
      return res.status(400).json({
        success: false,
        message: `User with this ${field} already exists`,
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Send token response
    sendTokenResponse(user, 201, res, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user (include password for comparison)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update user online status
    user.isOnline = true;
    user.lastSeen = new Date();
    await user.save();

    // Send token response
    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res, next) => {
  try {
    // Update user online status
    if (req.user) {
      req.user.isOnline = false;
      req.user.lastSeen = new Date();
      await req.user.save();
    }

    // Clear cookies
    res
      .status(200)
      .cookie('accessToken', 'none', {
        expires: new Date(Date.now() + 10 * 1000), // 10 seconds
        httpOnly: true,
      })
      .cookie('refreshToken', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: 'Logout successful',
      });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user.getPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/update
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { username, bio, avatar } = req.body;

    const fieldsToUpdate = {};
    if (username) fieldsToUpdate.username = username;
    if (bio !== undefined) fieldsToUpdate.bio = bio;
    if (avatar) fieldsToUpdate.avatar = avatar;

    // Check if username is already taken
    if (username && username !== req.user.username) {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'Username already taken',
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user.getPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update password
 * @route   PUT /api/auth/update-password
 * @access  Private
 */
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password',
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    sendTokenResponse(user, 200, res, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
};
