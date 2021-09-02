let fs = require("fs");
//const { resolve } = require("path");
let path = require("path");

const dbPath = path.join(__dirname, "../../db/", "books-db.json");

//console.log(dbPath);

let readDbAsync = ()=>{
    return new Promise((resolve, reject)=>{
        //Make this read intermittently using delay later if necessary
        fs.readFile(dbPath, (error, data)=>{
            if(error)
                reject(error);
            else
                resolve(data);
        });
    });
}

let writeDbAsync = (item)=>{
    return new Promise(async (resolve, reject)=>{
        let db = undefined;
        await readDbAsync()
            .then(res=>db=JSON.parse(res))
            .catch(err=>console.log(err));
        //console.log(db);
        db.push(item);
        console.log(db.length);
        fs.writeFile(dbPath, JSON.stringify(db), (error)=>{
            if(error)
                reject(error);
            else
                resolve();
        });
    });
}

let deleteDbAsync = (id)=>{
    return new Promise(async (resolve, reject)=>{
        let db = undefined;
        await readDbAsync()
            .then(res=>db=JSON.parse(res))
            .catch(err=>console.log(err));
        //console.log(db);
        console.log("Before Deletion",db.length);
        db = db.filter(item=>item._id!==id);
        console.log("After Deletion",db.length);
        fs.writeFile(dbPath, JSON.stringify(db), (error)=>{
            if(error)
                reject(error);
            else
                resolve();
        });
    });
}

// readDbAsync().then(data=>{
//     res = JSON.parse(data);
//     console.log(res.length);
// }).catch(error=>console.log(error));

// let newBook={
//         "_id":"5f4fc0396980a8fb2e76a878",
//         "isbn":"8165635728",
//         "title":"Sherlock Holmes",
//         "author":"Arthur Conan Doyle",
//         "price":"480",
//         "rating":"4.3",
//         "votes":"8600",
//         "tags":["Detective","Thriller","Politics","Drama","Period"],
//         "series":"",
//         "seriesIndex":"",
//         "releaseDate":"2017-05-19",
//         "cover":"https://i.pinimg.com/originals/f6/9a/d4/f69ad46f33a5ce68edcbe52801629cd6.jpg"
//     }

// writeDbAsync(newBook)
//     .then(()=>console.log("Added new book"))
//     .catch(error=>console.log(error));

module.exports={
    writeDb:writeDbAsync,
    readDb:readDbAsync,
    delDb:deleteDbAsync
}

// deleteDbAsync("5f4fc0396980a8fb2e76a878")
//     .then(()=>console.log("Deleted Book"))
//     .catch(error=>console.log(error));