let genId = function(){
    return Date.now().toString()
}

let _id = genId();

let saveBook = function(){
    let cover = document.getElementById("cover").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let title = document.getElementById("bookTitle").value;

    let newBook = {
        "_id" : _id,
        "cover": cover,
        "author": author,
        "title": title,
        "price": price
    }

    localStorage.setItem("newBook", JSON.stringify(newBook));
    localStorage.setItem("newBookFlag", "True");

    window.location.href = "booksWeb.html"

}

let init = function(){
    document.getElementById("bookId").innerHTML = `Auto Generated Book id : ${_id}`;
}