function calculator(){
    // Object members
    // list stores the list of input numbers
    //consoleDict stores (sum, avg, min) value pairs as [[s,20], [a,5], [m,0], ...]
    // counter keeps track of number of elemnets inserted after display is cleared (unnecessary for right now)
    // clerFlag is set when display is cleared (unnecessary for right now)
    this.counter = 0;
    this.list = [];
    this.consoleDict = []
    this.clearFlag = false;
}

calculator.prototype.addToList = function(){
    // Parses the number from the int field "number"
    // Checks weather the number is a legal number, if not legal throws exception and reloads the page
    // if number is legal then it's added to the list

    let num = parseInt(document.getElementById("number").value);
    console.log("Parsed Number", num)
    document.getElementById("number").value = "";
    
    if(isNaN(num)){
        alert("Enter a valid number");
        document.getElementById("number").value = "";
        return 0;
    }
    
    // insert to the top of the list
    this.list.unshift(num);

    // Count number of inserts if clearFlag is set
    if (this.clearFlag){
        this.counter += 1;
    }

    this.clearFlag = false;

    // Append to the HTML doc
    let root = document.getElementById("numberList");
    let listElement = document.createElement("li");
    listElement.appendChild(document.createTextNode(num));
    root.insertBefore(listElement, root.firstChild);
};

calculator.prototype.clearDisplay = function(){
    // Function to clear the entire display but not the memory.

    this.counter = 0;
    this.clearFlag = true;
    document.getElementById("numberList").innerHTML = "";
    document.getElementById("console").innerHTML = "";
};

calculator.prototype.clearAll = function(){
    // Resets the entire calculator (display and memory)
    this.counter = 0;
    this.list = []
    this.consoleDict = []
    document.getElementById("numberList").innerHTML = "";
    document.getElementById("console").innerHTML = "";
};

calculator.prototype.sum = function(){
    // Finds the sum of the current list and appends it to the console
    // If list is empty, emptyListException is thrown and page is  reloaded

    if(emptyArray(this.list)){
        emptyListException("sum");
        return 0;
    }

    let sum = this.list.reduce(function(pv, cv){
        return pv + cv;
    }, 0);

    // append to console dictionary
    this.consoleDict.push(["s", sum]);

    // Modify the HTML doc
    printConsole = document.getElementById("console");
    //printConsole.innerHTML = "";
    let para = document.createElement("p");
    let sumOut = document.createTextNode("The sum is " + sum);
    para.appendChild(sumOut);
    printConsole.appendChild(para)
};

calculator.prototype.avg = function(){
    // Finds the average of the current list and appends it to the console
    // If list is empty, emptyListException is thrown and page is  reloaded
    if(emptyArray(this.list)){
        emptyListException("avg");
        return 0;
    }

    let sum = this.list.reduce(function(pv, cv){
        return pv + cv;
    }, 0);
    let average = sum/this.list.length;

    console.log("In avg", "sum", sum, "len", this.list.length, "avg", average);
    
    this.consoleDict.push(["a" , average])
    printConsole = document.getElementById("console");
    //printConsole.innerHTML = "";
    let para = document.createElement("p");
    let avgOut = document.createTextNode("The average is " + average);
    para.appendChild(avgOut);
    printConsole.appendChild(para);
};

calculator.prototype.findMin = function(){
    // Finds the minimum of the current list and appends it to the console
    // If list is empty, emptyListException is thrown and page is reloaded
    if(emptyArray(this.list)){
        emptyListException("findMin");
        return 0;
    }

    let min = this.list.reduce(function(pv, cv){
        return (pv < cv ? pv :cv);
    });
    

    this.consoleDict.push(["m", min])
    printConsole = document.getElementById("console");
    //printConsole.innerHTML = "";
    let para = document.createElement("p");
    let minOut = document.createTextNode("The minimum is " + min);
    para.appendChild(minOut);
    printConsole.appendChild(para);

};


// The three functions sum, avg, min has the HTML appending part in common
// Can use a function for appending alone to clean the code and avoid redundency
// use a single function as the onCall for the three buttons passing the button object/name along the function
// switch the name of the button object for the three procedures.

calculator.prototype.resetList = function(){

    if(emptyArray(this.list)){
        emptyListException("resetList");
        return 0;
    }

    let root = document.getElementById("numberList");
    root.innerHTML = ""
    for (let val of this.list.values()){
        let listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(val));
        root.appendChild(listElement)
    }

    let consoleRoot = document.getElementById("console");
    consoleRoot.innerHTML = "";

    for (let val of this.consoleDict.values()){
        let para = document.createElement("p");
        let txtOut = document.createTextNode("");

        switch(val[0]){
            case "s":
                txtOut = document.createTextNode("The sum is "+val[1]);
                break;
            case "a":
                txtOut = document.createTextNode("The average is "+val[1]);
                break;
            case "m":
                txtOut = document.createTextNode("The minimum is "+val[1]);
                break;
            default:
                handleException();
        }

        para.appendChild(txtOut);
        consoleRoot.appendChild(para);
    }
};

function init(){
    var calcObj = new calculator();
    console.log("calcObj.list",calcObj.list);
    document.getElementById('add').onclick = function(){calcObj.addToList();};
    document.getElementById('clear').onclick = function(){calcObj.clearDisplay();};
    document.getElementById('reset').onclick = function(){calcObj.clearAll();};
    document.getElementById('sum').onclick = function(){calcObj.sum();};
    document.getElementById('avg').onclick = function(){calcObj.avg();};
    document.getElementById('min').onclick = function(){calcObj.findMin();};
    document.getElementById('refresh').onclick = function(){calcObj.resetList();}
    //document.getElementById('add').addEventListener('click', calcObj.addToList)

}

document.onload = init();

function handleException(){
    console.log("Unknown Exception: Unhandled value in consoleDict keys");
    alert("Unknown Exception");
    window.location.reload();
}

function emptyArray( arr ){
    if (arr === null || arr.length == 0 || arr === undefined){
        return true;
    }
    return false;
}

function emptyListException(functionName){
    console.log("Empty list exception at " + functionName);
    alert("The list is empty!!!");
    window.location.reload();
}