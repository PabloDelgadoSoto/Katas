window.onload = function () {
  console.log();
}

let str = "";
let cont = 0;
let order = ['second', 'minute', 'hour', 'day', 'year'];
const time = {
  0:60,
  1:60,
  2:24,
  3:365,
  4:150
}

const calc = function(pos, tiempo){
  let final;
  let comprobar = tiempo>=time[pos];
  let redondeo = Math.trunc(tiempo%time[pos]);
  if(cont==1 && redondeo>0){
    str=" and "+str;
  }else if(cont>1 && redondeo>0){
    str=", "+str;
  }
  redondeo>1?final="s":final="";
  redondeo!=0?str = redondeo+" "+order[pos]+final+str:cont--;
  cont++;
  if(comprobar){
    tiempo = tiempo/time[pos];
    return Math.trunc(tiempo);
  }
}

function formatDuration (seconds) {
  // format second to be readable for a human
  str = "";
  cont = 0;
  for(let i = 0; i < order.length; i++){
    seconds = calc(i, seconds);
    if(!seconds){
      break;
    }
  }
  if(str==""){
    str="now";
  }
  return str.trim();
}

// function solution(list){
//   // list of ordered integers with hyphens when there is a range of at least 3 consecutive numbers
//   let map = new Map();
//   for(let i = 0; i < list.length; i++){
//     let cont = 1;
//     while(list.includes(list[i]+cont)){
//       cont++;
//     }
//     map.set(list[i], cont);
//     cont>1?i+=cont-1:"";
//   }
//   let sol = "";
//   for(const[key,value] of map){
//     if(value>2){
//       sol+=key+"-"+(key+value-1)+",";
//     } else {
//       for(let i = 0; i < value; i++){
//         sol+=+(key+i)+",";
//       }
//     }
//   }
//   return sol.substring(0, sol.length-1);
//  }

// function domainName(url){
//   //extract site of url
//   let patron = /https?:\/\/(www\.)?|www\./g;
//   patron.exec(url);
//   url = url.substring(patron.lastIndex);
//   patron = /\w+(\-\w*)*\./;
//   url = patron.exec(url)[0];
//   return url.substring(0, url.length-1);
// }

// function order(words){
//   // put the words in the order they are given with the number in that word
//   if(words==""){
//     return "";
//   }
//   let palabras = words.split(" ");
//   let map = new Map();
//   let solucion = "";
//   for(let i = 0; i < palabras.length; i++){
//     map.set(parseInt(palabras[i].match(/\d/)[0]), palabras[i]+" ");
//   }
//   for(let i = 1; i <= map.size; i++){
//     solucion+=map.get(i);
//   }
//   return solucion.trim();
// }

// function digPow(n, p){
//   // given two numbers, n raised to consecutive powers starting from p equals to n * p
//   let nums = n.toString().split("");
//   let resultado = [];
//   let sol = 0;
//   for(let i = 0; i < nums.length; i++){
//     resultado.push(parseInt(nums[i])**(p+i));
//     sol+=resultado[i];
//   }
//   let c = sol/n;
//   if(sol%n==0){
//     return c;
//   }
//   return -1;
// }

// function dirReduc(arr){
//   // array with directions get the directions that cancel out
//   const dir={
//     "NORTH":"SOUTH",
//     "SOUTH":"NORTH",
//     "EAST":"WEST",
//     "WEST":"EAST"
//   }
//   let cont = 0;
//   while(cont < arr.length){
//     if(arr[cont+1]==dir[arr[cont]]){
//       arr.splice(cont+1, 1);
//       arr.splice(cont, 1);
//       cont=0;
//     } else{
//       cont++;
//     }
//   }
//   return arr;
// }

// function isPangram(string){
//   //check if its pangram
//   let is = true;
//   string = string.toLowerCase();
//   string = string.replace(/\s/, "");
//   string = string.replace(/[.]/, "");
//   let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//   for(let i = 0; i < arr.length; i++){
//     string.includes(arr[i])?"":is=false;
//   }
//   return is;
// }

// function generateHashtag (str) {
//   //create hashtag, no spaces, all words first letter uppercase, >140 false, empty false
//   let sol = "#";
//   str = str.replace(/\s{2,}/g, " ");
//   if(str != " " && str != ""){
//     s = str.split(" ");
//     for(let i = 0; i < s.length; i++){
//       sol += s[i].charAt(0).toUpperCase();
//       sol += s[i].substring(1);
//     }
//     if(sol.length>140){
//       return false;
//     }
//     return sol;
//   }
//   return false;
// }

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