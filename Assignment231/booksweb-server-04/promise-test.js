
const delay= time => new Promise(resolve=>setTimeout(resolve, time));

console.log('typeof(delay)',typeof(delay));


console.log('typeof(delay)==="function"',typeof(delay)==="function");


const x= delay(5000);

console.log('x',x.__proto__.constructor.name);
console.log('typeof x.then',typeof x.then);
console.log('typeof x.catch',typeof x.catch);

console.log('x instanceof Promise',x instanceof Promise);




