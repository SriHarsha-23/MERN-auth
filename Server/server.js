import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

//  CORS FIRST
// const allowedOrigins = ['http://localhost:5173'];
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
//   exposedHeaders: ['set-cookie']
// }));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  credentials: true
}));
 // Allow credentials for cookies

// API End Points
app.get('/', (req, res) => res.send("API is working Fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
