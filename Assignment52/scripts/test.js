let show= (a,b, ...params)=>{
    console.log(`${a}\t${b}\t${params}`);

}

const val = [1,2,3,4,5,6,7,8,9,10];
const res = val.filter((x,y)=> y%2===0);
console.log(res)