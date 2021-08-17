function calculator(){
    this.counter = 0;
    this.list = [];
    this.clearFlag = false;
}

calculator.prototype.addToList = function(){
    let num = parseInt(document.getElementById("number").value);
    console.log(num)
    if(this.list === null){
        console.log("Array Null");
        this.list = new Array();
    }
    console.log(this.list.length)
    //if
    this.list.unshift(num);
    if (this.clearFlag){
        this.counter += 1;
        // this.list.unshift(num)
        // let root = document.getElementById("numberList");
        // let listElement = document.createElement("li");
        // listElement.appendChild(document.createTextNode(num));
        // root.insertBefore(listElement, root.firstChild)

    }
    this.clearFlag = false;
    let root = document.getElementById("numberList");
    let listElement = document.createElement("li");
    listElement.appendChild(document.createTextNode(num));
    root.insertBefore(listElement, root.firstChild);
};

calculator.prototype.clearDisplay = function(){
    this.counter = 0;
    this.clearFlag = true;
    document.getElementById("numberList").innerHTML = "";
};

calculator.prototype.clearAll = function(){
    this.counter = 0;
    this.list = []
    document.getElementById("numberList").innerHTML = "";
    document.getElementById("console").innerHTML = "";
};

calculator.prototype.sum = function(){
    let sum = this.list.reduce(function(pv, cv){
        return pv + cv;
    }, 0);
    //return sum;
    printConsole = document.getElementById("console");
    printConsole.innerHTML = "";
    let para = document.createElement("p");
    let sumOut = document.createTextNode(sum);
    para.appendChild(sumOut);
    printConsole.appendChild(para)
};

calculator.prototype.avg = function(){
    let sum = this.list.reduce(function(pv, cv){
        return pv + cv;
    }, 0);
    //return sum/this.list.length;
    printConsole = document.getElementById("console");
    printConsole.innerHTML = "";
    let para = document.createElement("p");
    let avgOut = document.createTextNode(sum/this.list.length);
    para.appendChild(avgOut);
    printConsole.appendChild(para);
};

calculator.prototype.findMin = function(){
    let min = this.list.reduce(function(pv, cv){
        return (pv < cv ? pv :cv);
    }, 99999);
    //return min;
    printConsole = document.getElementById("console");
    printConsole.innerHTML = "";
    let para = document.createElement("p");
    let minOut = document.createTextNode(min);
    para.appendChild(minOut);
    printConsole.appendChild(para);
};

calculator.prototype.resetList = function(){
    let root = document.getElementById("numberList");
    root.innerHTML = ""
    for (let val of this.list.values()){
        let listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(val));
        root.appendChild(listElement)
    }
};

function init(){
    var calcObj = new calculator();
    document.getElementById('add').onclick = calcObj.addToList;
    document.getElementById('clear').onclick = calcObj.clearDisplay;
    document.getElementById('reset').onclick = calcObj.clearAll;
    document.getElementById('sum').onclick = calcObj.sum;
    document.getElementById('avg').onclick = calcObj.avg;
    document.getElementById('min').onclick = calcObj.findMin;
    document.getElementById('refresh').onclick = calcObj.resetList;
    //document.getElementById('add').addEventListener('click', calcObj.addToList)

}

document.onload = init();