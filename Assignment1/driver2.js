var list = []
var clearFlag = false


function addToList(){
    let num = parseInt(document.getElementById("number").value);
    
    if(isNaN(num)){
        alert("Enter a valid number");
        document.getElementById("number").value = "";
        return 0;
    }

    document.getElementById("number").value = "";
    console.log(num);
    if(list === null){
        console.log("Array Null");
        list = new Array();
    }
    console.log(list.length);
    list.unshift(num);
    let root = document.getElementById("numberList");
    let listElement = document.createElement("li");
    listElement.appendChild(document.createTextNode(num));
    root.insertBefore(listElement, root.firstChild);
}

function clearDisplay(){
    clearFlag = true;
    document.getElementById("numberList").innerHTML = "";
}

function clearAll(){
    list = []
    document.getElementById("numberList").innerHTML = "";
    document.getElementById("console").innerHTML = "";
}

function sum(){
    if(emptyArray(list)){
        alert("Empty List!!!!");
        return 0;
    }
    let sum = list.reduce(function(pv, cv){
        return pv + cv;
    }, 0);
    

    printConsole = document.getElementById("console");
    printConsole.innerHTML = "";
    let para = document.createElement("p");
    let sumOut = document.createTextNode(sum);
    para.appendChild(sumOut);
    printConsole.appendChild(para)
}

function avg(){
    if(emptyArray(list)){
        alert("Empty List!!!!");
        return 0;
    }
    let sum = list.reduce(function(pv, cv){
        return pv + cv;
    }, 0);
    

    printConsole = document.getElementById("console");
    printConsole.innerHTML = "";
    let para = document.createElement("p");
    let avgOut = document.createTextNode(sum/list.length);
    para.appendChild(avgOut);
    printConsole.appendChild(para);
}

function findMin(){
    if(emptyArray(list)){
        alert("Empty List!!!!");
        return 0;
    }
    
    let min = list.reduce(function(pv, cv){
        return (pv < cv ? pv :cv);
    });


    printConsole = document.getElementById("console");
    printConsole.innerHTML = "";
    let para = document.createElement("p");
    let minOut = document.createTextNode(min);
    para.appendChild(minOut);
    printConsole.appendChild(para);
}

function resetList(){
    if(emptyArray(list)){
        alert("Empty List!!!!");
        return 0;
    }

    let root = document.getElementById("numberList");
    root.innerHTML = ""
    for (let val of list.values()){
        let listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(val));
        root.appendChild(listElement)
    }
}

function init(){
    document.getElementById('add').onclick = addToList;
    document.getElementById('clear').onclick = clearDisplay;
    document.getElementById('reset').onclick = clearAll;
    document.getElementById('sum').onclick = sum;
    document.getElementById('avg').onclick = avg;
    document.getElementById('min').onclick = findMin;
    document.getElementById('refresh').onclick = resetList;
}

function emptyArray( arr ){
    if (arr === null || arr.length == 0){
        return true;
    }
    return false;
}

document.onload = init();