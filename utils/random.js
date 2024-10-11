export const generateRandomBooks = (n) => {
    const titles = ["Book A", "Book B", "Book C", "Book D", "Book E"];
    const authors = ["Author 1", "Author 2", "Author 3", "Author 4", "Author 5"];
    const genres = ["Fiction", "Non-Fiction", "Science", "Fantasy", "Biography"];

    const randomBooks = [];

    for (let i = 0; i < n; i++) {
        const title = titles[Math.floor(Math.random() * titles.length)];
        const author = authors[Math.floor(Math.random() * authors.length)];
        const genre = genres[Math.floor(Math.random() * genres.length)];
        const publicationDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0];
        const isbn = `978-3-${Math.floor(Math.random() * 10000000)}`;

        randomBooks.push({ title, author, genre, publicationDate, isbn });
    }

    return randomBooks;
};