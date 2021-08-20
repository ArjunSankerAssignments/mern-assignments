let books= [ 
    
        new Book('The Accursed God','Vivek Dutta Mishra',399),
        new Book('The Count of Monte Cristo','Alexandre Dumas',450),
        //add few more books here
        new Book('Good Omens', 'Neil Gaiman', 100),
        new Book('Feet of Clay', 'Terry Pratchett', 500),
        new Book('The Lord of the Rings', 'J R R Tolkien', 350),
        new Book('Othello', 'William Shakespere', 200)
];


books[0].addReview(createReview('Great book on Mahabharata',4.4));
books[0].addReview(createReview('Just another book! Not that great', 4));

books[1].addReview(createReview('One of all time greatest classic',4.8));
books[1].addReview(createReview('Adventure, excitement and lengthy', 4.2));

books[2].addReview(createReview('Adventureous and Funny',4.2));
books[2].addReview(createReview('Good comedic timings suitable for children', 3.9));

books[3].addReview(createReview('Not the best book in the disc world series',3.5));
books[3].addReview(createReview('A cavalcade of different emotions', 4.2));

books[4].addReview(createReview('One of all time greatest classic fictions',4.6));
books[4].addReview(createReview('Adventure, excitement and lengthy', 4.7));

books[5].addReview(createReview('One of all time greatest classic',4.8));
books[5].addReview(createReview('Dramatic', 4.5));




function showBook(book, bookNum, totalBooks){

    document.getElementById("bookTitle").innerHTML=book.title;
    document.getElementById("bookAuthor").innerHTML=book.author;
    document.getElementById("bookPrice").innerHTML=book.price;
    document.getElementById("bookRating").innerHTML=book.getRating();

    let reviews = document.getElementById("reviews");
    reviews.innerHTML='';

    for(let review of book.reviews){
        reviews.innerHTML+=`
                            <tr>
                                <td>${review.description}</td>
                                <td>${review.rating}/5</td>
                            </tr>
                            `
    }
    document.getElementById("bookNum").innerHTML=`${bookNum}/${totalBooks}`
}

let index=0;

function next(){
    index++;;
    if(index>=books.length)
        index=books.length-1;
    showBook(books[index], index+1, books.length);
}

function previous(){
    index--;
    if(index<=0)
        index=0;
    showBook(books[index], index+1, books.length);
}



