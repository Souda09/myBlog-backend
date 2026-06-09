// import express from 'express';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './routes/authRoutes.js';
// import blogRoutes from './routes/blogRoutes.js';

// import dns from 'dns'

// dns.setServers(["8.8.8.8", "1.1.1.1"])
// dotenv.config();

// const app = express();

// // CORS
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Server running' });
// });

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('MongoDB error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });






import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Simple route for testing
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Blog API is running on Vercel',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection (cached for serverless)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Import routes after DB connection
let authRoutes, blogRoutes;

// Dynamic imports to avoid circular dependencies
const loadRoutes = async () => {
  authRoutes = (await import('./routes/authRoutes.js')).default;
  blogRoutes = (await import('./routes/blogRoutes.js')).default;
  
  app.use('/api/auth', authRoutes);
  app.use('/api/blogs', blogRoutes);
};

loadRoutes();

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Connect to DB on first request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

export default app;