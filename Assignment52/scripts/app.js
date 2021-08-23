
const manager = new BookManager();
function displayBookList(parentElementId) {

    let bookList = document.getElementById(parentElementId); //get reference to the tbody
    bookList.innerHTML = ''; //empty the tbody


    for (let book of manager.getAllBooks()) {
        let tr = `
        <tr>
            <td><img  src='${book.cover}'/></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <a class='primary' href='book-details.html?id=${book._id}'>Details</a>
                <a class='danger' href='#' onclick='deleteBook("${book._id}")'>Delete</a>
            </td>
        </tr>        
        `

        bookList.innerHTML+=tr;
    }

}

function deleteBook(bookId){
    //console.log('deleting book ', bookId);
    manager.removeBook(bookId);
    displayBookList('books');
}

function setHtml(id,content){
    document.getElementById(id).innerHTML=content;
}

function setValue(id,content){
    document.getElementById(id).value=content;
}

function showBookDetails(){
    console.log(window.location.search);
    let id = window.location.search.replace("?id=","");
    console.log('id',id);

    let book=manager.getBookById(id);
    console.log('book',book);

    setHtml('book-title',book.title);
    setHtml('book-author',book.author);
    setHtml('book-details',book.description);
    document.getElementById('cover-image').src=book.cover;

       
}

function getValue(id){
    return document.getElementById(id).value;
}

function addBook(){
    let book={
        _id: getValue('id'),
        title:getValue('title'),
        author: getValue('author'),
        cover:getValue('cover'),
        description: getValue('description'),
    }
    console.log('book',book);
    manager.addBook(book);
    window.location.href="index.html";
    
}

function addReview(){
    let reviewerName = getValue("reviewer-name");
    let reviewerRating = getValue("reviewer-rating");
    let reviewerComment = getValue("reviewer-comment");

    let reviewContainer = document.getElementById("reviews");

    let contents = reviewContainer.innerHTML;
    
    contents += `
    <div class="review">
        <h2>${reviewerName} rate ${reviewerRating}</h2>
        <p>${reviewerComment}</p>
    </div>
    `
    reviewContainer.innerHTML = contents;
}


function displayPartialBookList(books) {

    let bookList = document.getElementById("books"); //get reference to the tbody
    bookList.innerHTML = ''; //empty the tbody


    for (let book of books) {
        let tr = `
        <tr>
            <td><img  src='${book.cover}'/></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <a class='primary' href='book-details.html?id=${book._id}'>Details</a>
                <a class='danger' href='#' onclick='deleteBook("${book._id}")'>Delete</a>
            </td>
        </tr>        
        `

        bookList.innerHTML+=tr;
    }

}

function searchResults(){
    let type = document.getElementById("searchType").value;
    let searchKey = document.getElementById("searchTerm").value;
    let results = undefined;
    if(type === "author" || type === "title"){
        results = manager.getAllBooks().filter(
            book=>book[type].toLowerCase().indexOf(searchKey.toLowerCase()) > -1
            );
    console.log(results);
    }else{
        results = manager.getAllBooks().filter(
            book=>book["_id"] === searchKey
            );
    }

    displayPartialBookList(results);
}