/*
ROT13 is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet. ROT13 is a special case of the Caesar cipher.

Write a function  that takes a string and returns the ciphered string. If there are numbers or special characters included in the string, they should be returned as they are. Only letters from the latin/english alphabet should be shifted.
*/
const rotChar = (char) => {
  let aux = char.charCodeAt(0);
  if(/[a-m]/gi.test(char)) {
    aux +=   13;
  } else if(/[n-z]/gi.test(char)) {
    aux -= 13;
  }
  return String.fromCharCode(aux);
 }

const rot13 = (val) => {
  return val.split('').map(rotChar).join('');
}

function verify(sampler, sample, expected) {
  const result = sampler(sample);
  if ( result === expected) {
    console.log(`Ok! - ${sample} results in ${expected}`);
  } else {
    console.log(`Not ok - ${sample} should be ${expected}, not ${result}`);
  }
}

console.clear();
verify(rot13, "test", "grfg");
verify(rot13, "Test", "Grfg");
verify(rot13, "Ruby is cool!", "Ehol vf pbby!");
verify(rot13, "10+2 is twelve.", "10+2 vf gjryir.");
verify(rot13, "abcdefghijklmnopqrstuvwxyz", "nopqrstuvwxyzabcdefghijklm");
console.log("Done!");
