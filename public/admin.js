/* 
Instructions:
1. Retrieve a list of books from the server.
2. Display a list of book titles to the admin.
3. Place a number input next to each book title.
4. Give each number input a value: the quantity of the associated book.
5. Place a submit button next to each number input.
6. When the submit button is clicked, retrieve the quantity from the associated number input and save the updated quantity to the server.

Acceptance Criteria:
- When viewing the page in the browser, http://localhost:3001/admin.html must show the list of book titles specified in db.json.
- When viewing the page in the browser, http://localhost:3001/admin must have a number input and a submit button next to each book title.
- When a book"s submit button is clicked after entering a quantity in the number input on http://localhost:3001/admin.html, the quantity of the book must be updated. 
- This new quantity must be rendered correctly when viewing http://localhost:3001.
- When viewing the page in the browser, http://localhost:3001 must show the list of books specified in db.json.
div
*/

async function admin() {
    let response = await fetch("http://localhost:3001/listBooks")
    let books = await response.json()
    books.forEach(renderBook)
}

function renderBook(book) {
    let bookContainer = document.querySelector(".book-container")
    bookContainer.innerHTML += `
        <section class="col-sm-3">
            <section class="card admin-card" style="width: 100%;">
                <img class="card-img-top" src="${book.imageURL}" />
                <section class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Available:</h6>
                    <input type="number" id="book-${book.id}" value="${book.quantity}"/>
                    <input type="submit" id="submit-btn" value="Update Quantity" onClick="updateQuantity(${book.id})"/>
                    <p class="card-text">${book.description}</p>
                </section>
            </section>
        </section>
    `
}

async function updateQuantity(bookId) {
    let newQuantity = document.getElementById(`book-${bookId}`).value
    let response = await fetch("http://localhost:3001/updateBook/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id": bookId,
            "quantity": newQuantity
        })
    })
    response = await response.json()
    return response;
}

admin()