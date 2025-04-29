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
- Cloudinary account (free tier available)

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
2. Get your Cloud Name, API Key, and API Secret from the Cloudinary dashboard
3. Add these credentials to your `.env` file as shown above
4. Configure your Cloudinary settings for audio files:
   - Enable audio uploads in your Cloudinary settings
   - Set up appropriate upload presets for audio files
   - Configure CORS settings to allow uploads from your domain

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
- cloudinary - Cloudinary SDK for file management
- multer - File upload middleware
- Other development dependencies for TypeScript and testing

### Frontend (client/package.json)

- React - UI library
- React Router - Navigation
- Axios - HTTP client
- Material-UI or other UI component library
- React Player or similar audio player component
- react-dropzone - For file uploads
- @cloudinary/react - Cloudinary React components

## Development

### Backend Development

- The server uses TypeScript for type safety
- API endpoints are organized in the `routes` directory
- Models are defined in the `models` directory
- Controllers handle business logic in the `controllers` directory
- Cloudinary integration for file uploads and management
- Audio file validation and processing

### Frontend Development

- React components are organized in the `components` directory
- State management is handled using React Context or Redux
- Styling is done using CSS modules or styled-components
- Cloudinary upload widget integration
- Audio player implementation

## File Upload Process

1. Frontend uses react-dropzone for file selection
2. Files are validated for type and size
3. Files are uploaded to Cloudinary using signed uploads
4. Cloudinary returns secure URLs for audio streaming
5. URLs are stored in MongoDB with metadata

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
