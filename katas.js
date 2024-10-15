window.onload = function () {
  console.log();
}

function findOdd(A) {
  // find what element from given array appears an odd number of times
  let map = new Map();
  let sol= 0;
  for(let i = 0; i < A.length; i++){
    if(map.get(A[i])){
      map.set(A[i], map.get(A[i])+1);
      continue;
    }
    map.set(A[i], 1);
  }
  for(const [key,value] of map){
    if(value%2==1){
      sol=key;
    }
  }
  return sol;
}
//solution from commetns that i found clever and want to save
//const findOdd = (xs) => xs.reduce((a, b) => a ^ b);

// function maskify(cc) {
//   // mask code but last 4 digits
//   for(let i = 0; i < cc.length-4; i++){
//     cc = cc.replace(cc[i], '#');
//   }
//   return cc;
// }

// function disemvowel(str) {
// // eliminate vowels from string
//   return str.replace(/[aeiou]/gi, "");
// }