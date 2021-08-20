let createReview = function(comment, rating){
    let returnReview = {
        comment: comment,
        rating: rating

    };

    return returnReview;
};

function Book(title, author, price, reviews){
    this.title = title;
    this.author = author;
    this.price = price;

    if(reviews !== undefined){
        this.reviews = reviews;
    }else{
        this.reviews = [];
    }


    this.addReview = function(comment, rating){
        this.reviews.push(createReview(comment, rating));
    }

    this.getRating = function(){
        sumReviews = 0;
        for(let review of this.reviews){
            sumReviews += review["rating"];
        }

        if(this.reviews.length !== 0)
            return sumReviews/this.reviews.length;
        
        return 0
    }

    this.show = function(){
        console.log("Title", this.title);
        console.log("Author", this.author);
        console.log("Price", this.price);
        console.log();

        for(let review of this.reviews){

            if(this.reviews.length !== 0){
                console.log()
                console.log("Review");
                //console.log();

                console.log("Comment",review["comment"]);
                console.log("Rating", review["rating"]);
            }else{
                console.log("No rating");
            }
        }
    }

}

b1 = new Book("ABC Murders", "Agatha Christie", 200);
b1.addReview("Good", 4.5);
b1.addReview("Not good", 3.2);
b1.addReview("Not bad", 3.5);

b1.show();
console.log();
console.log("Rating by getRating",b1.getRating())