/* 

Instructions:
1. Retrieve a list of books from the server.
2. Display a list of book titles to the admin.
3. Place a text input next to each book title.
4. Give each text input a value: the quantity of the associated book.
5. Place a submit button next to each text input.
6. When the submit button is clicked, retrieve the quantity from the associated text input and save the updated quantity to the server.

Acceptance Criteria:
- When viewing the page in the browser, http://localhost:3001/admin.html must show the list of book titles specified in db.json.
- When viewing the page in the browser, http://localhost:3001/admin must have a text input and a submit button next to each book title.
- When a book's submit button is clicked after entering a quantity in the text input on http://localhost:3001/admin.html, the quantity of the book must be updated. 
- This new quantity must be rendered correctly when viewing http://localhost:3001.
- When viewing the page in the browser, http://localhost:3001 must show the list of books specified in db.json.

*/

async function admin() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)
}

function renderBook(book) {
    console.log(book.id)
    let bookContainer = document.querySelector('.book-container')
    bookContainer.innerHTML += `
        <div class="col-sm-3">
            <div class="card" style="width: 100%;">
                ${book.imageURL ? `
                    <img class="card-img-top" src="${book.imageURL}" />
                `
                : ``}
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Available:</h6>
                    <input type='number' id='quantity-${book.id}' value='${book.quantity}'></input>
                    <input type="submit" value="Update Quantity" onClick="updateQuantity(${book.id})"/>
                    <p class="card-text">${book.description}</p>
                </div>
            </div>
        </div>
    `
}


async function updateQuantity(bookId) {
    let newQuantity = document.getElementById(`quantity-${bookId}`).value
    let response = await fetch('http://localhost:3001/updateBook/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id': bookId,
            'quantity': newQuantity
        })
    })
    response = await response.json()
    return response;
}


admin()
