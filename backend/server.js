import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth_routes.js';
import playerRoutes from './routes/player_routes.js';

// Load env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);

// Use PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
