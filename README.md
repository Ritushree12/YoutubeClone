# YouTube Clone

A full-stack web application that replicates core YouTube functionality, built with modern web technologies.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Video Management**: Upload, view, and manage videos
- **Channel System**: Create and manage personal channels
- **Interactive Features**: Like/dislike videos, add comments
- **Search & Discovery**: Search videos by title and category
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ritushree12/YoutubeClone.git
   cd YoutubeClone
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   BASE_URL=http://localhost:5000
   ```

5. **Start the application**

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
YoutubeClone/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── uploads/        # File uploads directory
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── assets/         # Static assets
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Videos
- `GET /api/videos` - Get all videos (with search/category filters)
- `POST /api/videos` - Create video metadata
- `POST /api/videos/upload` - Upload video file
- `GET /api/videos/:id` - Get video by ID

### Channels
- `POST /api/channels` - Create channel
- `GET /api/channels/me` - Get user's channels
- `GET /api/channels/:id` - Get channel by ID

### Comments
- `GET /api/comments?videoId=:id` - Get comments for video
- `POST /api/comments` - Add comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

## 🎯 Usage

1. **Register/Login**: Create an account or log in
2. **Create Channel**: Set up your personal channel
3. **Upload Videos**: Add videos to your channel
4. **Explore Content**: Browse, search, and watch videos
5. **Interact**: Like, dislike, and comment on videos

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- GitHub: [Ritushree12](https://github.com/Ritushree12)
- Project Link: [https://github.com/Ritushree12/YoutubeClone](https://github.com/Ritushree12/YoutubeClone)