# ToriLynq 🌍

<div align="center">

![ToriLynq Logo](https://via.placeholder.com/150x150/10B981/FFFFFF?text=TL)

**Where Stories Connect**

A modern social media platform that blends storytelling, connection, and creativity for the African community and beyond.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Live Demo](#) | [Documentation](#features) | [Report Bug](https://github.com/yourusername/torilynq/issues) | [Request Feature](https://github.com/yourusername/torilynq/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

**ToriLynq** (from "Tori" meaning "story" in Nigerian Pidgin and "Lynq" symbolizing connection) is an innovative social media platform designed to celebrate African storytelling and foster meaningful connections. Built as a capstone project for the PLP MERN Stack Development Program, ToriLynq combines the best features from leading social platforms into one cohesive, culturally-relevant experience.

### Why ToriLynq?

- 🌍 **Culturally Relevant**: Built with African users in mind, celebrating local culture and expression
- 📱 **Modern & Intuitive**: Clean, responsive design that works seamlessly on all devices
- ⚡ **Real-time Everything**: Instant messaging, live notifications, and real-time updates
- 🎨 **Feature-Rich**: Posts, Stories, Videos, Trending content, and more
- 🔒 **Privacy-Focused**: Comprehensive privacy controls and data security
- 🚀 **Scalable Architecture**: Built for growth with modular, maintainable code

---

## ✨ Key Features

### Core Features

#### 🔐 Authentication & User Management
- Email/password registration and login
- Google OAuth integration
- JWT-based secure authentication
- Complete profile management with avatar upload
- Follow/unfollow system
- User search functionality

#### 📝 Posts & Feed
- Create posts with text and images
- Like and unlike posts
- Comment system
- Delete own posts
- Personalized feed from followed users
- Individual post detail pages
- Hashtag support

#### 📖 Stories (24-hour Disappearing Content)
- Upload image-based stories
- Story carousel on home feed
- Auto-deletion after 24 hours
- Story viewer with progress indicators
- View count tracking

#### 💬 Real-time Chat
- One-on-one messaging with Socket.io
- Media sharing in messages
- Online/offline status indicators
- Read receipts
- Typing indicators
- Complete message history

#### 🔔 Notifications
- Real-time notifications for:
  - New followers
  - Post likes and comments
  - New messages
- Notification center with unread badges
- Mark as read functionality

#### 🔍 Explore & Discovery
- User search by username
- Hashtag-based post discovery
- Trending hashtags feed
- Explore page with categorized content

#### 🎬 Videos (TikTok/Reels Style)
- Vertical video feed (coming soon)
- Full-screen viewing experience
- Engagement metrics (likes, comments, shares)
- Sound integration
- For You and Following feeds

#### 🔥 Trending
- Trending hashtags with growth metrics
- Trending locations
- Trending sounds
- Trending creators
- Hot posts feed

#### ⚙️ Settings & Privacy
- Comprehensive privacy controls
- Notification preferences
- Account security settings
- Profile visibility controls
- Message permission settings
- Data download capability
- Dark mode (coming soon)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18+ with Hooks
- **Styling**: TailwindCSS 3+ (utility-first CSS)
- **State Management**: Redux Toolkit + Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Real-time**: Socket.io-client
- **Form Handling**: React Hook Form + Yup validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Testing**: Jest + React Testing Library

### Backend
- **Runtime**: Node.js 18+ LTS
- **Framework**: Express.js 4+
- **Database**: MongoDB 6+ with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + Passport.js
- **Password Security**: bcrypt
- **Real-time**: Socket.io
- **File Upload**: Multer + Cloudinary SDK
- **Validation**: express-validator
- **Testing**: Jest + Supertest
- **API Documentation**: Swagger/OpenAPI 3.0

### DevOps & Deployment
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Backend Hosting**: Render / Railway
- **Frontend Hosting**: Vercel / Netlify
- **Database Hosting**: MongoDB Atlas
- **Media Storage**: Cloudinary
- **Monitoring**: Sentry (error tracking)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) or **yarn**
- **MongoDB** (v6.x or higher) - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/torilynq.git
   cd torilynq
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**
   
   Create `.env` files in both `backend` and `frontend` directories:

   **Backend `.env`:**
   ```env
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:3000

   # Database
   MONGODB_URI=mongodb://localhost:27017/torilynq
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/torilynq

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   JWT_EXPIRE=7d

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Cloudinary (For image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   **Frontend `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

5. **Start the Development Servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs (if configured)

---

## 💻 Usage

### Creating Your First Post

1. **Register/Login** to your account
2. Click the **"Create Post"** button
3. Add your content and optionally upload an image
4. Add hashtags to increase discoverability
5. Click **"Post"** to share with your followers

### Starting a Conversation

1. Navigate to the **Chat** page
2. Search for a user or select from recent conversations
3. Type your message and press send
4. See real-time typing indicators and read receipts

### Uploading a Story

1. Click on your profile picture in the **Stories carousel**
2. Select an image from your device
3. Add an optional caption
4. Your story will be visible for 24 hours

---

## 📸 Screenshots

### Home Feed
![Home Feed](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Home+Feed)

### Profile Page
![Profile Page](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Profile+Page)

### Real-time Chat
![Chat Interface](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Chat+Interface)

### Stories Feature
![Stories](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Stories)

### Explore Page
![Explore](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Explore+Page)

---

## 📁 Project Structure

```
torilynq/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── socket/          # Socket.io handlers
│   │   ├── utils/           # Utility functions
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   ├── tests/               # Backend tests
│   ├── .env.example         # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── common/      # Reusable components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── posts/       # Post components
│   │   │   ├── stories/     # Story components
│   │   │   ├── chat/        # Chat components
│   │   │   └── profile/     # Profile components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── tests/               # Frontend tests
│   └── package.json
│
├── docs/                    # Documentation
├── .gitignore
├── README.md
└── LICENSE
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Posts Endpoints

#### Get Feed
```http
GET /api/posts
Authorization: Bearer {token}
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "content": "My first post!",
  "image": File
}
```

For complete API documentation, visit `/api-docs` when running the backend server.

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests with Coverage
```bash
# Backend
cd backend
npm run test:coverage

# Frontend
cd frontend
npm run test:coverage
```

### End-to-End Tests (Cypress)
```bash
cd frontend
npm run test:e2e
```

---

## 🚢 Deployment

### Deploy Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set environment variables
4. Deploy!

### Deploy Frontend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the frontend directory
3. Follow the prompts
4. Your app is live!

### Deploy Database (MongoDB Atlas)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in backend `.env`

---

## 🗺️ Roadmap

### Phase 1: MVP ✅ (Current)
- [x] User authentication
- [x] Posts feed
- [x] Real-time chat
- [x] Stories
- [x] Notifications
- [x] Profile management
- [x] Explore page

### Phase 2: Enhanced Features 🚧 (Q2 2025)
- [ ] Video posts and Reels
- [ ] Group chats
- [ ] Push notifications
- [ ] Advanced search
- [ ] Nested comments
- [ ] Post sharing

### Phase 3: Advanced Features 🔮 (Q3 2025)
- [ ] Analytics dashboard
- [ ] Creator monetization
- [ ] AI content moderation
- [ ] Multi-language support
- [ ] Mobile apps (React Native)
- [ ] Live streaming

### Phase 4: Expansion 🌟 (Q4 2025)
- [ ] Business accounts
- [ ] Advertising platform
- [ ] E-commerce integration
- [ ] Event management
- [ ] Marketplace

See the [open issues](https://github.com/yourusername/torilynq/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and inclusive

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

**Project Link**: [https://github.com/yourusername/torilynq](https://github.com/yourusername/torilynq)

**Live Demo**: [https://torilynq.vercel.app](https://torilynq.vercel.app)

---

## 🙏 Acknowledgments

This project was built as part of the **Power Learn Project (PLP) MERN Stack Development Bootcamp**.

Special thanks to:

- [Power Learn Project](https://powerlearnproject.org/) for the comprehensive curriculum
- [React Documentation](https://react.dev/) for excellent learning resources
- [MongoDB University](https://university.mongodb.com/) for database training
- [Socket.io](https://socket.io/) for real-time functionality
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- All open-source contributors whose libraries made this possible

### Inspired By
- Instagram (Stories, Profile, Explore)
- WhatsApp (Real-time chat, Status)
- Twitter/X (Feed, Trending, Hashtags)
- TikTok (Video feed, Engagement)
- Snapchat (Disappearing content)

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/torilynq)
![GitHub stars](https://img.shields.io/github/stars/yourusername/torilynq?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/torilynq?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/torilynq)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/torilynq)

---

<div align="center">

**Made with ❤️ for the African community and beyond**

[⬆ Back to Top](#torilynq-)

</div>