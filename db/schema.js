import {pgTable, serial, varchar, date, unique, integer} from 'drizzle-orm/pg-core';

const inventoryTable = pgTable('inventory', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    genre: varchar('genre', { length: 100 }).notNull(),
    publicationDate: date('publication_date').notNull(),
    isbn: varchar('isbn', { length: 13 }).notNull(),
}, (table) => {
    return {
        isbnIndex: unique('isbn_index').on(table.isbn),
    };
});

export { inventoryTable };