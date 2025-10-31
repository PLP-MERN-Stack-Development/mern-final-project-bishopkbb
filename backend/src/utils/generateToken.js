const jwt = require('jsonwebtoken');

/**
 * Generate JWT access token
 * @param {string} userId - User's MongoDB _id
 * @returns {string} JWT token
 */
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * Generate JWT refresh token
 * @param {string} userId - User's MongoDB _id
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
  );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @param {string} secret - Secret key (optional, defaults to JWT_SECRET)
 * @returns {object} Decoded token payload
 */
const verifyToken = (token, secret = process.env.JWT_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Send token response (cookie + JSON)
 * @param {object} user - User object
 * @param {number} statusCode - HTTP status code
 * @param {object} res - Express response object
 * @param {string} message - Success message
 */
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Cookie options
  const cookieOptions = {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  // Send response
  res
    .status(statusCode)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    .json({
      success: true,
      message,
      accessToken,
      refreshToken,
      user: user.getPublicProfile(),
    });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  sendTokenResponse,
};
