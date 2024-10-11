const addBookForm = document.getElementById('add-book-form');
const successAlert = document.getElementById('success-alert');
const errorAlert = document.getElementById('error-alert');
const submitBtn = document.getElementById('submitBtn');

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // remove the alerts in case they are present
    errorAlert.classList.add('d-none');
    successAlert.classList.add('d-none');

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let isbn = document.getElementById("isbn").value;
    let genre = document.getElementById("genre").value;
    let publicationDate = document.getElementById("publication-date").value;

    // ISBN validation (basic check using regex)
    const isbnRegex = /^(ISBN-13|ISBN-10):?\d{13}|\d{10}$/;
    if (!isbnRegex.test(isbn)) {
        errorAlert.classList.remove('d-none');
        errorAlert.textContent = 'Invalid ISBN format.';
        return;
    }

    if (title && author && isbn && genre && publicationDate) {
        let bookInfo = {
            title,
            author,
            isbn,
            genre,
            publicationDate,
        };

        fetch('/add-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookInfo)
        })
            .then(result => {
                successAlert.classList.remove('d-none');
                successAlert.textContent = 'Book added successfully!';
                submitBtn.disabled = true;
                // let the user view the updated data for 5 seconds and keep the button disabled
                setTimeout(() => {
                    successAlert.classList.add('d-none');
                    document.getElementById('title').value = '';
                    document.getElementById('author').value = '';
                    document.getElementById('genre').value = '';
                    document.getElementById('publication-date').value = '';
                    document.getElementById('isbn').value = '';
                    submitBtn.disabled = false;
                }, 5000);
            })
            .catch(error => {
                console.error('Error adding book: ', error.message);
                alert('Error adding book. Please try again.');
            });
    } else {
        errorAlert.classList.remove('d-none');
        errorAlert.textContent = 'Please fill in all required fields.';
    }
});
