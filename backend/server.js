import express from 'express';
import dotenv from 'dotenv';
import cors from'cors';
import userRoutes from './routes/userRoutes.js'
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));

app.use('/api/users',userRoutes);

app.get('/',(req,res) => 
    res.send('server is ready')
)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => 
    console.log(`server started on port ${PORT}`)
);