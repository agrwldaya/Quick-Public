import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors'; 
import dbconnect from './config/database.js';
import fileUpload from 'express-fileupload';
import { cloudinaryconnect } from './config/cloudinary.js';
import { NormalUserRoute } from './routes/normalUserRoute.js';
import { ClientRoute } from './routes/clientAuth.js';
import { empRoute } from './routes/empRoute.js';
import { NewsPaperRoute } from './routes/NewsRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import Contactrouter from './routes/contactRoutes.js';

const app = express();
const Port = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json());

// Use CORS middleware
app.use(cors());

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
app.use("/api/v1", Contactrouter);

// Start the server
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(Port, () => {
  console.log(`App is listening on port ${Port}`);
});
