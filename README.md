# EchoPlay - Audio Streaming Application

EchoPlay is a modern audio streaming application that allows users to play and manage their music collection. The application consists of a React frontend and a Node.js/TypeScript backend with MongoDB for data storage, using Cloudinary for audio file management.

## Project Structure

```
echoplay/
├── client/          # React frontend application
├── server/          # Node.js/TypeScript backend
└── docker-compose.yml  # Docker configuration for MongoDB
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- MongoDB (or use Docker as described below)
- Cloudinary account (for audio file storage)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd echoplay
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/echoplay
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Set Up Cloudinary

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the Cloudinary Dashboard
3. Add these credentials to your `.env` file as shown above

### 4. Set Up the Frontend

```bash
cd client
npm install
```

### 5. Start MongoDB using Docker

```bash
docker-compose up -d
```

This will start a MongoDB instance on port 27017.

### 6. Start the Development Servers

In separate terminal windows:

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm start
```

The application should now be running with:

- Backend API at `http://localhost:5000`
- Frontend at `http://localhost:3000`

## Features

- Audio file upload and management using Cloudinary
- Secure audio file storage and streaming
- Playlist creation and management
- Real-time audio playback
- User authentication (if implemented)
- Responsive design

## Dependencies

### Backend (server/package.json)

- Express.js - Web framework
- TypeScript - Type-safe JavaScript
- MongoDB - Database
- Mongoose - MongoDB ODM
- dotenv - Environment variable management
- cors - Cross-origin resource sharing
- cloudinary - Cloudinary SDK for file uploads
- multer - File upload middleware
- Other development dependencies for TypeScript and testing

### Frontend (client/package.json)

- React - UI library
- React Router - Navigation
- Axios - HTTP client
- Material-UI or other UI component library
- React Player or similar audio player component
- react-dropzone - For file uploads

## Development

### Backend Development

- The server uses TypeScript for type safety
- API endpoints are organized in the `routes` directory
- Models are defined in the `models` directory
- Controllers handle business logic in the `controllers` directory
- Audio files are uploaded to Cloudinary and stored as URLs in MongoDB

### Frontend Development

- React components are organized in the `components` directory
- State management is handled using React Context or Redux
- Styling is done using CSS modules or styled-components
- File uploads are handled using react-dropzone
- Audio playback uses Cloudinary's streaming URLs

## File Upload Process

1. Audio files are uploaded to Cloudinary through the backend API
2. Cloudinary processes the files and returns secure URLs
3. These URLs are stored in MongoDB along with metadata
4. The frontend uses these URLs for streaming audio playback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
