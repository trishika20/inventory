const successAlert = document.getElementById('success-alert');
const errorAlert = document.getElementById('error-alert');

document.getElementById('randomBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // remove the alerts in case they are present
    errorAlert.classList.add('d-none');
    successAlert.classList.add('d-none');

    const count = document.getElementById('bookCount').value;

    fetch('/add-random-books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: parseInt(count, 10) }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('OOPS! Some error at our end!');
            }
        })
        .then((addedBooks) => {
            successAlert.textContent = `${count} books added successfully!`;
            successAlert.classList.remove('d-none');
            setTimeout(() => {
                successAlert.classList.add('d-none');
            }, 5000);
        })
        .catch((error) => {
            errorAlert.textContent = error.message;
            errorAlert.classList.remove('d-none');
            setTimeout(() => {
                errorAlert.classList.add('d-none');
            }, 5000);
        });

});