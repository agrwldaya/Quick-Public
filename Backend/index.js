import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';  // Importing the CORS package
import dbconnect from './config/database.js';
import fileUpload from 'express-fileupload';
import { cloudinaryconnect } from './config/cloudinary.js';
import { NormalUserRoute } from './routes/normalUserRoute.js';
import { ClientRoute } from './routes/clientAuth.js';
import { empRoute } from './routes/empRoute.js';
import { NewsPaperRoute } from './routes/NewsRoute.js';
import paymentRoute from './routes/paymentRoute.js';

const app = express();
const Port = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json());

// Use CORS middleware
app.use(cors(
  {
    origin :"https://quick-publish-news-press.vercel.app"
  }
));  // This will allow all origins by default

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Connect to database and Cloudinary
dbconnect();
cloudinaryconnect();

// Define routes
app.use('/api/v1/client', ClientRoute);
app.use('/api/v1/normaluser', NormalUserRoute);
app.use('/api/v1/employee', empRoute);
app.use('/api/v1', NewsPaperRoute);
app.use('/api/v1', paymentRoute);

// Start the server
app.listen(Port, () => {
  console.log(`App is listening on port ${Port}`);
});
