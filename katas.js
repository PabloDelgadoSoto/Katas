window.onload = function () {
  console.log();
}

//calculator that takes into account spaces, parenthesis, order in operations
const cuentas = {
  "+":function(n1,n2){return n1+n2},
  "-":function(n1,n2){return n1-n2},
  "*":function(n1,n2){return n1*n2},
  "/":function(n1,n2){return n1/n2}
}
let cambiar = [];
const calc = function (expression) {
  expression="("+expression+")";
  expression = expression.replaceAll(" ","");
  while(expression.match(/[+|\-|*|/]/g)){
    cambiar[0] = false;
    s = reducir(expression);
    let negativos = cambiarNegativos(s);
    let guardado = negativos[1];
    s = negativos[0];
    let op = s.match(/[+|\-|*|/]/g);
    let ph = s.replaceAll(/[+|\-|*|/]/g," ");
    let nums = ph.split(" ");
    let r = 0;
    if(op==null){op = []};
    while(op.length!=0){
      if(s.includes("n")){
        for(let i = 0; i < guardado.length; i++){
          for(let j = 0; j < nums.length; j++){
            nums[j] = nums[j].replace("n"+i+"n", guardado[i]);
            s = s.replace("n"+i+"n", guardado[i]);
            nums[j] = parseFloat(nums[j]);
          }
        }
      }
      let operar = calcularOrden(op);
      //evita NaN cuando se introduce solo un negativo
      if((op[operar]=="+"||op[operar]=="-")&&nums[operar]==""){
        nums[operar]="0";
      }
      r = cuentas[op[operar]](parseFloat(nums[operar]),parseFloat(nums[operar+1]));
      nums.splice(operar,1);
      op.splice(operar,1);
      nums[operar] = r;
    }
    nums[0]=""+nums[0];
    nums[0]=cambiarSigno(nums[0])
    //salir para cuando el resultado es negativo
    if(nums[0]==expression){
      break;
    }
    let inicioString = "(";
    if(cambiar[0]){
      inicioString = "-(";
      if(nums[0]>0&&cambiar[1]>=0){
        nums[0]="+"+nums[0];
      }
    }
    expression = expression.replace(inicioString+s+")",nums[0]);
    cambiar[0] = false;
  }

  expression = expression.replaceAll(/[(|)]/g,"");
  return parseFloat(expression);
}

function cambiarSigno(r){
  if(cambiar[0]){
    if(r.includes("-")){
      r=r.replace("-","");
    }else{
      r="-"+r;
    }
  }
  return r;
}

function cambiarNegativos(str){
  let n = str.match(/\D\-\d/g);
  if(n==null){return [str,0]}
  for(let i = 0; i < n.length; i++){
    str = str.replace(n[i].substring(1), "n"+i+"n");
    n[i]=n[i].substring(1);
  }
  return [str,n];
}

function calcularOrden(op){
  let operar = 0;
  if(op.includes("+") || op.includes("-")){
    for(let i = 0; i < op.length; i++){
      if(op[i]=="*"||op[i]=="/"){
        operar = i;
        return operar;
      }
    }
  }
  return operar;
}

function reducir(str){
  let s = str;
  while(s.includes("(")){
    let p = encontrarParentesis(s);
    cambiar[0] = false;
    //mirar si el parentesis tiene resta antes
    if(s[p[0]-1]=="-"){
      cambiar[0] = true;
      cambiar[1] = s[p[0]-2];
    }
    s = s.substring(p[0]+1, p[1]);
  }
  return s;
}

function encontrarParentesis(str){
  let abrir = 0;
  let cerrar = 0;
  let contAbrir = 0;
  let contCerrar = 0;
  let encontrado = false;
  for(let i = 0; i < str.length; i++){
    if(str[i]==")"){
      contCerrar++;
      if(contCerrar-contAbrir==0){
        cerrar=i;
        break;
      }
    }
    if(str[i]=="("){
      if(!encontrado){
        abrir = i;
        encontrado = true;
      }
      contAbrir++;
    }
  }
  return [abrir, cerrar];
}

/*
function VigenèreCipher(key, abc) {
  //series of caesar ciphers to cipher a single string
  this.key = key;
  this.abc = abc;
  this.encode = function (str) {
    let resultado = "";
    let clave = key;
    for(let i = 0; i < str.length; i++){
      clave+=key[i%key.length];
      let letra = str[i];
      if(abc.includes(letra)){
        let cambio = (abc.indexOf(clave[i])+abc.indexOf(letra))%abc.length;
        resultado+=abc[cambio];
      }else{
        resultado+=letra;
      }
    }
    return resultado;
  };
  this.decode = function (str) {
    let resultado = "";
    let clave = key;
    for(let i = 0; i < str.length; i++){
      clave+=key[i%key.length];
      let letra = str[i];
      if(abc.includes(letra)){
        let cambio = (abc.indexOf(letra)-abc.indexOf(clave[i]))%abc.length;
        if(cambio<0){
          cambio+=abc.length;
        }
        resultado+=abc[cambio];
      }else{
        resultado+=letra;
      }
    }
    return resultado;
  };
}
*/
/*
let cont = 0;
let barcos = [];
let correcto;
let prohibir = [];
let left = [4,3,3,2,2,2,1,1,1,1];
function validateBattlefield(field){
  //check if a field is correct for a battleships game
  correcto = true;
  for(let i = 0; i < field.length; i++){
    for(let j=0;j<field[i].length;j++){
      if(field[i][j]==1){
        cont = 0;
        verBarco(field,i,j);
        if(cont>0){
          barcos.push(cont);
        }
      }
    }
  }
  if(barcos.length==10){
    numBarcos(1,4);
    numBarcos(2,3);
    numBarcos(3,2);
    numBarcos(4,1);
  }else{
    correcto = false;
  }
  return correcto;
}

function numBarcos(num, tamaño){
  for(let i=0;i<num;i++){
    if(barcos.includes(tamaño)){
      barcos.splice(barcos.indexOf(tamaño),1);
    }else{
      correcto = false;
    }
  }
}

function verBarco(field,fila,columna){
  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      let visitado = prohibir.includes((fila+i)+'-'+(columna+j));
      prohibir.push((fila+i)+'-'+(columna+j));
      if(desbordar(fila+i) && desbordar(columna+j) && field[fila+i][columna+j]==1 && !visitado){
        cont++;
        verBarco(field,(fila+i), (columna+j));
      }
    }
  }
}

const desbordar = function (num,tablero) {
  if (num < 0) {
      return false;
  } else if (num > tablero) {
      return false;
  }
  return true;
};
*/
/*
let arr;
let max;
let resultado;
function isInteresting(number, awesomePhrases) {
  // number with several conditions listed in the functions below
  resultado = 0;
  max = number + 2;
  return comprobar(number, awesomePhrases);
}

function comprobar(num, awesomePhrases) {
  if (num > max) { return }
  num += "";
  arr = num.split("");
  num = parseInt(num);
  if ((num > 99) && (followedByZeros() || sameNumber() || incrementing() || decrementing() || palindrome() || matchArray(num, awesomePhrases))) {
    return 2;
  } else {
    let c = comprobar(num + 1, awesomePhrases);
    if (c == 2) {
      resultado = 1;
    }
  }
  return resultado;
}

function followedByZeros() {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] != 0) {
      return false;
    }
  }
  return true;
}

function sameNumber() {
  for (let i = 0; i < arr.length; i++) {
    if (arr[0] != arr[i]) {
      return false;
    }
  }
  return true;
}

function incrementing() {
  for (let i = 1; i < arr.length; i++) {
    if (((parseInt(arr[i - 1]) + 1) != parseInt(arr[i]))) {
      if(parseInt(arr[i-1])+1==10 && parseInt(arr[i])==0){
        continue;
      }
      return false;
    }
  }
  return true;
}

function decrementing() {
  for (let i = 1; i < arr.length; i++) {
    if ((parseInt(arr[i - 1]) - 1) != parseInt(arr[i])) {
      return false;
    }
  }
  return true;
}

function palindrome() {
  let rev = [...arr];
  arr.reverse();
  let sRev = "";
  let sArr = "";
  for (let i = 0; i < arr.length; i++) {
    sRev += rev[i];
    sArr += arr[i];
  }
  return sRev == sArr;
}

function matchArray(num, array) {
  return array.includes(num);
}
*/
/*
//transform numbers to roman numbers y viceversa
const numeros=[["I","V"],["X","L"],["C","D"],["M"]];
const romanos = crearMapa();
function crearMapa(){
  map = new Map();
  map.set("I",1);
  map.set("V",5);
  map.set("X",10);
  map.set("L",50);
  map.set("C",100);
  map.set("D",500);
  map.set("M",1000);
  return map;
}
let resta=false;
let sol;
function calcularDigitoRomano(n, pos){
  while(n>0){
    if(n==9){
      sol+=numeros[pos][0]+numeros[pos+1][0];
      n-=9;
    }else if(n>3){
      if(n==4){
        sol+=numeros[pos][0];
      }
      sol+=numeros[pos][1];
      n-=5;
    }else{
      sol+=numeros[pos][0];
      n-=1;
    }
  }
}
function calcularDesdeRomano(num, siguiente){
  n=romanos.get(num);
  s=romanos.get(siguiente);
  if(n>s){
    sol+=(n-s);
    resta=true;
  }else{
    sol+=n;
  }
}

class RomanNumerals {
  static toRoman(num) {
    num = num.toString();
    let long = num.length;
    num = num.split("");
    sol="";
    for(let i = 0; i < num.length; i++){
      calcularDigitoRomano(num[i], (long-1)-i);
    }
    return sol;
  }

  static fromRoman(num){
    num = num.split("");
    sol=0;
    for(let i = num.length-1; i >= 0; i--){
      if(resta){resta=false;continue}
      calcularDesdeRomano(num[i], num[i-1]);
    }
    return sol;
  }
}
*/
/*
// hacerlo en una linea (no es mi solucion)
// const determinant = m => m.length === 1 ? m[0][0] : m[0].reduce((s, n, i) => s + (i % 2 === 0 ? 1 : -1) * n * determinant(m.slice(1).map(r => r.filter((_, j) => j !== i))), 0);
let guardar;
let resultados;

function determinant(m) {
  // return the determinant of the matrix passed in
  guardar = [];
  resultados = [];
  for (let j = 0; j < m.length; j++) {
    shrink(m, 0, j);
  }
  guardar.push(m);
  return calcular(m);
};

function shrink(matriz, fila, columna) {
  let nuevo = [];
  let cont = 0;
  for (let i = 0; i < matriz.length; i++) {
    if (i == fila) { cont++; continue }
    nuevo.push([]);
    for (let j = 0; j < matriz[i].length; j++) {
      if (j == columna) { continue }
      nuevo[i - cont].push(matriz[i][j]);
    }
    if (nuevo[0].length >= 2) {
      for (let x = 0; x < nuevo.length; x++) {
        shrink(nuevo, 0, x);
      }
    }
  }
  guardar.push(nuevo);
}

function calcular(matriz) {
  let importantes = [];
  for(let i = 0; i < guardar.length; i++){
    if(guardar[i][0]==undefined || (guardar[i].length != guardar[i][0].length)){
      continue;
    }
    importantes.push(guardar[i]);
  }
  for(let x = 1; x <= matriz.length; x++){
    for(let i = 0; i < importantes.length; i++){
      let long = importantes[i].length;
      if(long==x+1){
        let cont = 0;
        let sol = [];
        let quitar = [];
        for(let j = 0; j < long; j++){
          cont++;
          let res = importantes[i][0][j]*importantes[i-long+j][0][0];
          cont%2==0?res= res-(res*2):"";
          sol.push(res);
          quitar.push(i+(j-long));
        }
        let suma = 0;
        for(let j = 0; j < sol.length; j++){
          suma += sol[j];
        }
        importantes.splice(i, 1, [[suma]]);
        quitar.reverse();
        quitar.forEach(num => {
          importantes.splice(num, 1);
        });
      }
    }
  }
  return importantes[0][0][0];
}
*/

// function topThreeWords(text) {
//   //return the top 3 most used words in a text
//   text=text.replace(/[,./:|\s]+/g, " ").trim().split(" ");
//   let p = [];
//   text.forEach(e => {
//     if(e!="'"){
//       p.push(e.toLowerCase());
//     }
//   });
//   let palabras = new Map();
//   for(let i = 0; i < p.length; i++){
//     let comprobar = palabras.get(p[i])
//     if(comprobar){
//       palabras.set(p[i], comprobar+1);
//     } else {
//       palabras.set(p[i], 1);
//     }
//   }
//   const orden = new Map([...palabras.entries()].sort((a, b) => b[1] - a[1]));
//   let cont = 1;
//   let sol = [];
//   for (const [key,value] of orden) {
//     sol.push(key);
//     if(cont==3){break}
//     cont++;
//   }
//   return sol!=""?sol:[];
// }

// function scramble(str1, str2){
//   // check if a string can be formed with the letters of another string, perfomance is important
//   let map = new Map();
//   for(let i = 0; i < str2.length; i++){
//     let ultimo = map.get(str2[i]);
//     !ultimo?map.set(str2[i], 1):map.set(str2[i], ultimo+1);
//   }
//   for(let i = 0; i < str1.length; i++){
//     map.set(str1[i], map.get(str1[i])-1);
//   }
//   for(const[key,value] of map){
//     if(value>0){
//       return false;
//     }
//   }
//   return true;
// }

/*
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
*/

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