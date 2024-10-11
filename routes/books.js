import express from 'express';
import { addBook, filterBooks } from '../db/inventory.js';
import {generateRandomBooks} from "../utils/random.js";

const router = express.Router();

router.post('/add-book', async (req, res) => {
    const { title, author, genre, publicationDate, isbn } = req.body;
    try {
        const book = await addBook({title, author, genre, publicationDate, isbn });
        res.json(book);
    } catch (error) {
        res.status(500).send(`Error adding book: ${error.message}`);
    }
});

router.get('/filter-books', async (req, res) => {
    const { title, author, genre } = req.query;
    const criteria = { title, author, genre };
    try {
        const books = await filterBooks(criteria);
        res.json(books);
    } catch (error) {
        res.status(500).send(`Error filtering books: ${error.message}`);
    }
});

router.get('/export-books', async (req, res) => {
    const {format, title, author, genre} = req.query;
    const filters = {title, author, genre};
   try {
       const books = await filterBooks(filters);
       if (books.length === 0) {
           return res.status(404).json({message: 'No books found'});
       }
       if (format === 'csv') {
           const csv = convertToCSV(books);
           res.setHeader('Content-Type', 'text/csv');
           res.attachment("data.csv").send(csv);
       } else {
           res.setHeader('Content-Type', 'application/json');
           res.attachment("data.json").send(JSON.stringify(books, null, 2)); // Send JSON data
       }
   } catch (e) {
       res.status(500).json({ error: e.message });
   }
});

router.post('/add-random-books', async (req, res) => {
    const { count } = req.body; // Number of random books to add
    if (!count || count <= 0) {
        return res.status(400).send('Please provide a valid count greater than 0.');
    }

    const randomBooks = generateRandomBooks(count);

    try {
        const addedBooks = [];
        for (const book of randomBooks) {
            const addedBook = await addBook(book);
            addedBooks.push(addedBook);
        }

        res.json(addedBooks);
    } catch (error) {
        res.status(500).send(`Error adding books: ${error.message}`);
    }
});

function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)

    return array.map(it => {
        return Object.values(it).toString()
    }).join('\n')
}

export default router;
