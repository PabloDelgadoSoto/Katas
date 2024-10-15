window.onload = function () {
  console.log();
}

function maskify(cc) {
  for(let i = 0; i < cc.length-4; i++){
    cc = cc.replace(cc[i], '#');
  }
  return cc;
}

// function disemvowel(str) {
//   return str.replace(/[aeiou]/gi, "");
// }