# Changelog

All notable changes to the ToriLynq project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- 🎉 Initial release of ToriLynq social media platform
- ✨ User authentication with JWT and Google OAuth
- 📝 Create, read, and delete posts with images
- ❤️ Like and comment on posts
- 📖 24-hour disappearing Stories feature
- 💬 Real-time one-on-one messaging with Socket.io
- 🔔 Real-time notifications system
- 👥 Follow/unfollow users
- 🔍 User search functionality
- #️⃣ Hashtag support in posts
- 🌐 Explore page with trending content
- 👤 User profiles with editable information
- 🖼️ Profile picture upload functionality
- 🎬 VideosPage UI (TikTok/Reels style interface)
- 🔥 TrendingPage with hashtags, locations, sounds, and creators
- ⚙️ Comprehensive Settings page
  - Account security settings
  - Privacy controls
  - Notification preferences
  - Appearance settings
  - Data management
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎨 Modern UI with TailwindCSS
- 🔐 Secure password hashing with bcrypt
- 📊 Redux Toolkit for state management
- 🌓 Dark mode support (UI ready, coming in next update)

### Features in Detail

#### Authentication & User Management
- Email/password registration and login
- Google OAuth integration
- JWT-based authentication
- Profile creation and editing
- Avatar upload with preview
- Bio and location updates
- Follow/unfollow system

#### Posts & Feed
- Create posts with text and images
- Like/unlike posts
- Comment on posts
- Delete own posts
- Chronological feed of followed users
- Individual post detail view
- Hashtag parsing and linking

#### Stories
- Create 24-hour disappearing stories
- Story carousel on home feed
- Story viewer with progress indicators
- Auto-deletion after 24 hours
- View count tracking

#### Real-time Chat
- 1-on-1 messaging
- Media sharing in messages
- Online/offline status indicators
- Read receipts
- Typing indicators
- Message history

#### Notifications
- Real-time notifications for:
  - New followers
  - Post likes
  - Post comments
  - New messages
- Notification center with mark as read
- Unread notification badge

#### Explore & Discovery
- Search users by username
- Search posts by hashtags
- Trending hashtags feed
- Suggested users

#### Videos Page
- TikTok-style vertical feed UI
- Full-screen video viewing
- For You and Following tabs
- LIVE section indicator
- Engagement actions (like, comment, share, bookmark)
- Sound attribution
- Rotating sound disc animation
- Volume controls

#### Trending Page
- Trending hashtags with growth metrics
- Trending locations with images
- Trending sounds for videos
- Trending creators with verification badges
- Category filters
- Hot posts section

#### Settings
- Edit profile settings
- Account security options
- Comprehensive privacy controls
- Granular notification preferences
- Profile visibility settings
- Message permission controls
- Appearance customization
- Data download option
- Account deletion with confirmation

### Technical Improvements
- 🚀 Optimized Redux store structure
- 🔄 updateUser action for real-time profile updates
- 📦 localStorage integration for persistent auth
- 🎯 Protected routes for authenticated pages
- 🔗 Fixed navigation routing issues
- 🎨 Custom scrollbar hiding for better UX
- ⚡ Smooth animations and transitions
- 📱 Mobile-first responsive design

### Security
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API endpoints
- CORS configuration
- Input validation
- XSS protection

### Developer Experience
- Well-organized component structure
- Reusable UI components
- Custom React hooks
- Environment variable configuration
- Comprehensive code documentation
- Git workflow with meaningful commits

## [Unreleased]

### Planned for v1.1.0
- [ ] Video upload and playback functionality
- [ ] Group chat support
- [ ] Push notifications
- [ ] Advanced search filters
- [ ] Nested comment replies
- [ ] Post sharing/reposting
- [ ] User mentions in posts
- [ ] Story replies
- [ ] Dark mode full implementation
- [ ] Email notifications
- [ ] Password reset functionality
- [ ] Two-factor authentication

### Planned for v2.0.0
- [ ] Analytics dashboard
- [ ] Creator monetization
- [ ] AI-powered content moderation
- [ ] Multi-language support
- [ ] Live streaming
- [ ] Polls and surveys
- [ ] Event management
- [ ] Business/Creator accounts
- [ ] Advanced reporting system
- [ ] Admin panel

---

## Version History

- **v1.0.0** - Initial Release (January 2025)
  - Core social media features
  - Real-time messaging and notifications
  - Stories and posts
  - User profiles and discovery
  - Full responsive design

---

## Notes

- This project is built as a capstone for the PLP MERN Stack Development Program
- Contributions are welcome! See CONTRIBUTING.md for guidelines
- For bug reports and feature requests, please use GitHub Issues

---

**Legend:**
- 🎉 Major release
- ✨ New feature
- 🐛 Bug fix
- 🔧 Maintenance
- 📝 Documentation
- 🚀 Performance
- 🔒 Security
- 💄 UI/UX
- ♻️ Refactor