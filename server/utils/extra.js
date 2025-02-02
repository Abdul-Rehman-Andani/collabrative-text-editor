const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth'); // Import authentication routes
const Document = require('./models/Document'); // Import document model

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(cookieParser()); // To parse cookies
app.use('/api/auth', authRoutes); // Authentication routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/collaborative-editor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Socket.IO Middleware to verify JWT
const jwt = require('jsonwebtoken');

const verifyToken = (socket, next) => {
  const token = socket.request.cookies['auth_token'];

  if (!token) {
    return next(new Error('Authentication error'));
  }

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }

    socket.userId = decoded.userId;
    next();
  });
};

io.use(verifyToken);

// Real-time document editing
io.on('connection', (socket) => {
  console.log(`User connected with ID: ${socket.userId}`);

  // Open document
  socket.on('open-document', async (docId) => {
    const document = await Document.findById(docId);
    if (document) {
      socket.emit('load-document', document.content);
    } else {
      socket.emit('error', 'Document not found');
    }
  });

  // Edit document
  socket.on('edit-document', async (docId, newContent) => {
    const document = await Document.findById(docId);
    if (document) {
      document.content = newContent;
      document.lastEditedBy = socket.userId;
      document.lastEditedAt = Date.now();
      await document.save();

      io.emit('document-edited', newContent); // Broadcast changes
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
