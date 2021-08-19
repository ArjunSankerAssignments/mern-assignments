var bookList = [
    {
        title: "The Lord of the Rings",
        author: "J R R Tolkien",
        price: 200,
        rating: 4.5
    },

    {
        title: "The Hobbit",
        author: "J R R Tolkien",
        price: 100,
        rating: 4.2
    },

    {
        title: "The Silmarillion",
        author: "J R R Tolkien",
        price: 50,
        rating: 4.0
    },

    {
        title: "A Game of thrones",
        author: "George R R Martin",
        price: 400,
        rating: 4.3
    },

    {
        title: "Death in the clouds",
        author: "Agatha Christie",
        price: 150,
        rating: 3.8
    },

    {
        title: "Death in the Nile",
        author: "Agatha Christie",
        price: 175,
        rating: 3.9
    },

    {
        title: "Then there were none",
        author: "Agatha Christie",
        price: 500,
        rating: 4.7
    },

    {
        title: "Dumb Witness",
        author: "Agatha Christie",
        price: 1500,
        rating: 4.2
    },

    {
        title: "A storm of swords",
        author: "George R R Martin",
        price: 400,
        rating: 4.1
    },

    {
        title: "A clash of Kings",
        author: "George R R Martin",
        price: 450,
        rating: 4.4
    },

    {
        title: "Hamlet",
        author: "William Shakespere",
        price: 1000,
        rating: 4.8
    },

    {
        title: "Julius Cesar",
        author: "William Shakespere",
        price: 2000,
        rating: 4.7
    },

    {
        title: "Othello",
        author: "William Shakespere",
        price: 2500,
        rating: 4.9
    },

    {
        title: "The Merchant of Venice",
        author: "William Shakespere",
        price: 2800,
        rating: 4.6
    },

    {
        title: "A Midsummer Nights Dream",
        author: "William Shakespere",
        price: 5000,
        rating: 4.7
    }
];

baseSearch = function(list, fun, searchProperty, range=undefined){
    let returnArray = [];

    for(let obj of list)
        if(fun(obj, searchProperty, range))
            returnArray.push(obj);
    return returnArray;
};

authorName = function(book, author){
    //console.log("In authorName");
    //console.log(book.author.toLowerCase() === author.toLowerCase());
    if (book.author.toLowerCase() === author.toLowerCase())
        return true;
    return false;
};

checkRange = function(book, searchProperty, range){
    if( (book[searchProperty] >= range[0]) && (book[searchProperty] <= range[1]) )
        return true;
    return false;
};

// priceRange = function(book, range){
//     if ( (book.price>=range[0]) && (book.price<=range[1]) )
//         return true;
//     return false;
// };

partialTitleMatch = function(book, partialName){
    nameParts = book.title.split(" ");
    for(let name of nameParts)
        if(name.toLowerCase() === partialName.toLowerCase())
            return true;
    return false;
};

baseSearch2 = function(list, searchProperty){
    let results = 0;
    for(let obj of list)
        results += obj[searchProperty];
    return results/list.length; 
};

titlePriceBooks = function(list){
    let results = [];
    for(let book of list)
        results.push({
            title: book.title,
            price: book.price
        });
    return results;
}

console.log("Search by Author Name");
console.log();
console.log(baseSearch(bookList, authorName, "j r r Tolkien" ));
console.log();

console.log("Search by Price Range");
console.log();
console.log(baseSearch(bookList, checkRange, "price", [100, 500] ));
console.log();

console.log("Search by Rating Range");
console.log();
console.log(baseSearch(bookList, checkRange, "rating", [4.5, 4.8] ));
console.log();

console.log("Search by Partial Title");
console.log();
console.log(baseSearch(bookList, partialTitleMatch, "game" ));
console.log();

//console.log("Average Price");
console.log();
console.log("Average Price", baseSearch2(bookList, "price"));
console.log();

//console.log("Average Rating");
console.log();
console.log("Average Rating", baseSearch2(bookList, "rating"));
console.log();

console.log("Title and Price book list");
console.log(titlePriceBooks(bookList));
console.log();
