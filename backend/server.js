import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import products from './routes/products.js';
import user from './routes/user.js';
import order from './routes/order.js';
import blog from './routes/blog.js';
import cart from './routes/cart.js';
import upload from './routes/upload.js';
import { notFound, errorHandler } from './middleware/middleware.js';
import multiparty from 'connect-multiparty';

const __dirname = path.resolve();

const multipartyMiddleware = multiparty({
  uploadDir: path.join(__dirname, '/uploads'),
});

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.use('/api/products', products);
app.use('/api/users', user);
app.use('/api/cart', cart);
app.use('/api/orders', order);
app.use('/api/upload', upload);
app.use('/api/blogs', blog);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Accept-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.post('/ckeditor/upload', multipartyMiddleware, (req, res) => {
    const tempFile = req.files.upload;
    const tempPathFile = tempFile.path;

    const targetPathUrl = path.join(__dirname, "./uploads/" + tempFile.name);

    if (path.extname(tempFile.originalFilename).toLowerCase() === ".png" || ".jpg") {
        fs.rename(tempPathFile, targetPathUrl, err => {

            res.status(200).json({
              uploaded: true,
              url:
                'https://api-skylineshop.herokuapp.com/uploads/' +
                tempFile.name,
            });

            if (err) return console.log(err);
        })
    }
    console.log(req.files.upload);
});

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(__dirname, '/frontend/build')));

    // app.get('*', (req, res) => res.sendFile(path.resolve(__dirname + '/frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    })
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3500;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
