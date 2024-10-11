let currentPage = 1;
let booksPerPage = 10;
let totalPages = 0;
let filteredBooks = [];
let filters = {}

const makeQueryString = (filters) => {
    const queryParams = [];
    if (filters.title) {
        queryParams.push(`title=${filters.title}`);
    }
    if (filters.author) {
        queryParams.push(`author=${filters.author}`);
    }
    if (filters.genre) {
        queryParams.push(`genre=${filters.genre}`);
    }
   return queryParams.join('&');
}

const fetchBooks = () => {
    fetch(`/filter-books?${makeQueryString(filters)}`)
        .then(response => response.json())
        .then(data => {
            filteredBooks = data;
            totalPages = Math.ceil(filteredBooks.length / booksPerPage);
            updateBookList();
            updatePagination();
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
};

const filterBooks = () => {
    const titleFilter = document.getElementById('filter-by-title').value;
    const authorFilter = document.getElementById('filter-by-author').value;
    const genreFilter = document.getElementById('filter-by-genre').value;

    filters = {
        title: titleFilter,
        author: authorFilter,
        genre: genreFilter,
    }

    fetchBooks();

    // Reset pagination
    currentPage = 1;
    totalPages = Math.ceil(filteredBooks.length / booksPerPage);
};

const updateBookList = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;

    const currentBooks = filteredBooks.slice(startIndex, endIndex);

    // Update the book list table with currentBooks
    const bookListElement = document.getElementById('book-list');
    bookListElement.innerHTML = '';
    currentBooks.forEach(book => {
        const bookRow = document.createElement('tr');
        bookRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.publicationDate}</td>
            <td>${book.isbn}</td>
        `;
        bookListElement.appendChild(bookRow);
    });
};

const updatePagination = () => {
    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = '';

    if (totalPages > 1) {
        // Previous button
        const previousPageItem = document.createElement('li');
        previousPageItem.classList.add('page-item');
        if (currentPage === 1) {
            previousPageItem.classList.add('disabled');
        }
        const previousPageLink = document.createElement('a');
        previousPageLink.classList.add('page-link');
        previousPageLink.textContent = 'Previous';
        previousPageLink.href = '#';
        previousPageLink.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                updateBookList();
                updatePagination();
            }
        };
        previousPageItem.appendChild(previousPageLink);
        paginationElement.appendChild(previousPageItem);

        // Define how many page links to show
        const maxPagesToShow = 5;

        // Calculate start and end pages
        let startPage, endPage;
        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
            if (currentPage <= halfMaxPagesToShow) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + halfMaxPagesToShow >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - halfMaxPagesToShow;
                endPage = currentPage + halfMaxPagesToShow;
            }
        }

        // Add first page link
        if (startPage > 1) {
            const firstPageItem = document.createElement('li');
            firstPageItem.classList.add('page-item');
            const firstPageLink = document.createElement('a');
            firstPageLink.classList.add('page-link');
            firstPageLink.textContent = '1';
            firstPageLink.href = '#';
            firstPageLink.onclick = () => {
                currentPage = 1;
                updateBookList();
                updatePagination();
            };
            firstPageItem.appendChild(firstPageLink);
            paginationElement.appendChild(firstPageItem);
            if (startPage > 2) {
                const ellipsisItem = document.createElement('li');
                ellipsisItem.classList.add('page-item', 'disabled');
                ellipsisItem.innerHTML = '<a class="page-link">...</a>';
                paginationElement.appendChild(ellipsisItem);
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) {
                pageItem.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;
            pageLink.href = '#';
            pageLink.onclick = () => {
                currentPage = i;
                updateBookList();
                updatePagination();
            };
            pageItem.appendChild(pageLink);
            paginationElement.appendChild(pageItem);
        }

        // Add last page link
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsisItem = document.createElement('li');
                ellipsisItem.classList.add('page-item', 'disabled');
                ellipsisItem.innerHTML = '<a class="page-link">...</a>';
                paginationElement.appendChild(ellipsisItem);
            }
            const lastPageItem = document.createElement('li');
            lastPageItem.classList.add('page-item');
            const lastPageLink = document.createElement('a');
            lastPageLink.classList.add('page-link');
            lastPageLink.textContent = totalPages;
            lastPageLink.href = '#';
            lastPageLink.onclick = () => {
                currentPage = totalPages;
                updateBookList();
                updatePagination();
            };
            lastPageItem.appendChild(lastPageLink);
            paginationElement.appendChild(lastPageItem);
        }

        // Next button
        const nextPageItem = document.createElement('li');
        nextPageItem.classList.add('page-item');
        if (currentPage === totalPages) {
            nextPageItem.classList.add('disabled');
        }
        const nextPageLink = document.createElement('a');
        nextPageLink.classList.add('page-link');
        nextPageLink.textContent = 'Next';
        nextPageLink.href = '#';
        nextPageLink.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateBookList();
                updatePagination();
            }
        };
        nextPageItem.appendChild(nextPageLink);
        paginationElement.appendChild(nextPageItem);
    }
};


function exportData() {
    const format = document.getElementById('export-format').value;
    const scope = document.getElementById('export-scope').value;
    const endpoint = `/export-books?format=${format}${scope === 'filtered' ? `&${makeQueryString(filters)}` : ''}`;

    console.log(scope);

    // Perform the GET request
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Assuming the response is a file (CSV/JSON)
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `data.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Failed to export data.');
        });
}


// Initial fetch
fetchBooks();
updatePagination();