import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes/books.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load all env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes for handling book-related requests
app.use(routes);

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
