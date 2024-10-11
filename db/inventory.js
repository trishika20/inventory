import { db } from './drizzle.js';
import { inventoryTable } from './schema.js';
import { ilike } from 'drizzle-orm/expressions';

export const addBook = async (book) => {
    try {
        const result = await db.insert(inventoryTable).values(book).returning();
        return result;
    } catch (error) {
        throw new Error(`Error adding book: ${error.message}`);
    }
};

export const filterBooks = async (filters) => {
    try {
        const query = db.select().from(inventoryTable);

        if (filters.title) {
            query.where(ilike(inventoryTable.title, `%${filters.title}%`));
        }
        if (filters.author) {
            query.where(ilike(inventoryTable.author, `%${filters.author}%`));
        }
        if (filters.genre) {
            query.where(ilike(inventoryTable.genre, `%${filters.genre}%`));
        }

        return await query;
    } catch (error) {
        throw new Error(`Error filtering books: ${error.message}`);
    }
};
