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
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Simple CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is running on Vercel',
    time: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;