window.onload = function () {
  console.log();
}

function generateHashtag (str) {
  //create hashtag, no spaces, all words first letter uppercase, >140 false, empty false
  let sol = "#";
  str = str.replace(/\s{2,}/g, " ");
  if(str != " " && str != ""){
    s = str.split(" ");
    for(let i = 0; i < s.length; i++){
      sol += s[i].charAt(0).toUpperCase();
      sol += s[i].substring(1);
    }
    if(sol.length>140){
      return false;
    }
    return sol;
  }
  return false;
}

// function findMissingLetter(array){
//   //find the missing letter in an arary
//   let x1;
//   let x2;
//   let sol;
//   for(let i = 0; i < array.length; i++){
//     x1 = array[i].charCodeAt(0);
//     if(i !=0){
//       if(x1!=x2){
//         sol=x2;
//         break;
//       }
//     }
//     x2 = x1 + 1;
//   }
//   return String.fromCharCode(sol);
// }

// function friend(friends){
//   //4 letters in array
//   let arr = [];
//   friends.forEach(e => {
//     e.length==4?arr.push(e):"";
//   });
//   return arr;
// }

// function getCount(str) {
//   // number of vowels in string
//   let patron = /[aeiou]/gi;
//   let m = str.match(patron);
//   if(m){
//     return m.length;
//   }
//   return 0;
// }

// function isValidWalk(walk) {
//   //perfect grid given an array of positions, will it take exactly 10 mins and will you end on the same spot
//   let direcciones = {
//     'n':[0, 1],
//     's':[0, -1],
//     'e':[1, 1],
//     'w':[1, -1]
//   }
//   let lugar = [0, 0];
//   for(let i = 0; i < walk.length; i++){
//     lugar[direcciones[walk[i]][0]] = lugar[direcciones[walk[i]][0]] + direcciones[walk[i]][1];
//   }
//   if(lugar[0]!=0||lugar[1]!=0||walk.length!=10){
//     return false;
//   }
//   return true;
// }

// function duplicateEncode(word){
//   // Write '(' when a character appears once and ')' when it appears more than once
//   let visto = new Map();
//   word = word.toLowerCase();
//   for(let i = 0; i < word.length; i++){
//     let a = visto.get(word[i]);
//     if(a){
//       visto.set(word[i], a+1);
//       continue;
//     }
//     visto.set(word[i], 1);
//   }
//   let str = '';
//   for(let i = 0; i < word.length; i++){
//     visto.get(word[i]) > 1?str+=")":str+="(";
//   }
//   return str;
// }

// function findNextSquare(sq) {
//   // Return the next square if sq is a perfect square, -1 otherwise
//   let resultado = Math.sqrt(sq);
//   if(resultado%1 == 0){
//     return (resultado+1)**2;
//   }
//   return -1;
// }

// function findOdd(A) {
//   // find what element from given array appears an odd number of times
//   let map = new Map();
//   let sol= 0;
//   for(let i = 0; i < A.length; i++){
//     if(map.get(A[i])){
//       map.set(A[i], map.get(A[i])+1);
//       continue;
//     }
//     map.set(A[i], 1);
//   }
//   for(const [key,value] of map){
//     if(value%2==1){
//       sol=key;
//     }
//   }
//   return sol;
// }
// //solution from commetns that i found clever and want to save
// //const findOdd = (xs) => xs.reduce((a, b) => a ^ b);

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