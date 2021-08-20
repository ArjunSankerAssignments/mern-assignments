
function createReview(description,rating){
    let review=new Object();
    review.description=description,
    review.rating=rating;
    return review;    
}

function Book(title,author,price){
    this.title=title;
    this.author=author;
    this.price=price;
    this.reviews=[];
   
    
}

Book.prototype.addReview=function(review){
    this.reviews.push(review);
};

Book.prototype.getRating=function(){
    let sum=0;
    for(let review of this.reviews)
        sum+=review.rating;

    return sum/this.reviews.length;
}


