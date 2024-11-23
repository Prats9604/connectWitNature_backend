import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import postRoutes from './routes/destination';
import userRoutes from './routes/users';
import User from './models/User';

dotenv.config();
const app = express();

app.use(cors());  
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Mongo COnnection error', err));

// ---------------------
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
// ---------------------

app.get('/', (req, res) => { 
  res.send('Backend server is running');
});

app.get('/users', async(req, res) => {
   try {
        const users = await User.find();
        console.log( "user=========",users);
        res.status(200).json(users);
        // res.status(200).json({ message: 'Get all users' });
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));