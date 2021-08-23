let Review = function(reviewer, rating, details){
    this.reviewer = reviewer;
    this.rating = rating;
    this.details = details;
}

let printReview = function(reviews){
    let reviewPanel = document.getElementById("reviewPanel")
    for(let review of reviews){
        let para1 = document.createElement("p");
        para1.appendChild(document.createTextNode(`${review["reviewer"]} has rated ${review["rating"]}`))
        
        let para2 = document.createElement("p");
        para2.appendChild(document.createTextNode(`${review["details"]}`));

        reviewPanel.appendChild(para1);
        //reviewPanel.appendChild(document.createElement("br"));
        reviewPanel.appendChild(para2);
    }
}


let sumIt = function(arr){
    if(arr.length === 1)
        return arr[0]["rating"];
    else if(arr.length === 0)
        return 0;
    else{
        result = 0;
        for(let val of arr)
            result += val["rating"];
        return result/arr.length;
    }
}

function printDetails(){
    let currentDetails = JSON.parse(localStorage.getItem("latestDetails"));
    console.log(currentDetails);

    let detailsPanel = document.getElementById("bookDetails");

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(currentDetails["title"]));
    
    let pricePara = document.createElement("p");
    pricePara.appendChild(document.createTextNode(`Price ${currentDetails["price"]}`));

    let ratePara = document.createElement("p");
    ratePara.appendChild(document.createTextNode(`Rating : ${sumIt(currentDetails["reviews"])}`));

    detailsPanel.appendChild(h3);
    detailsPanel.appendChild(pricePara);
    detailsPanel.appendChild(ratePara);

    let imgElement = document.createElement("img");
    imgElement.src = currentDetails["cover"];

    let imgPanel = document.getElementById("imgDisp");
    imgPanel.appendChild(imgElement);

    printReview(currentDetails["reviews"]);

}

function saveReview(){
    let currentDetails = JSON.parse(localStorage.getItem("latestDetails"));
    let reviewer = document.getElementById("reviewerName").value;
    //console.log("Reviewer", reviewer);

    let rating = parseInt(document.getElementById("rating").value);
    //console.log("Rating", rating);

    let details = document.getElementById("details").value;
    //console.log("Details", details);

    latestReview = new Review(reviewer, rating, details);
    localStorage.setItem(currentDetails["_id"].toString(), JSON.stringify(latestReview));
    localStorage.setItem("reviewFlag", currentDetails["_id"].toString());
    window.location.href = "booksWeb.html";
}