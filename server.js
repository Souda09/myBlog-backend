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
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dns from 'dns';

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const app = express();

// CORS - Dynamic origin for production vs local
const allowedOrigin = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_URL // Set your frontend Vercel URL in your env variables
  : 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running' });
});

// Serverless-friendly MongoDB Connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Middleware to ensure DB is connected on every serverless function invocation
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// CRITICAL FOR VERCEL: Export the app, DO NOT use app.listen() in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

export default app;