/* Find duplicate products in 3 arrays. */


// using hashmap
function duplicados(name, price, weight) {
 	const hm = {};
  let count = 0;
  name.forEach( (name1, index) =>{
  	const key = `${name1}_${price[index]}_${weight[index]}`
  	hm[key] = hm[key] + 1 || 1
  })
  Object.keys(hm).forEach((el)=>{
    if(hm[el]>1) {
        count += hm[el]-1
    }
  })
  console.log(count)
}

// using Set
function duplicados2(name, price, weight) {
  const set = new Set(name.map( (name1, index) =>{
  	return (`${name1}_${price[index]}_${weight[index]}`)
  }));
  console.log(name.length-set.size)
}

function main() {
  const n = ["carne", "sal", "sal", "arroz", "carne", "sal"];
  const p = [2, 1, 3, 4, 2, 3]
  const w = [6, 4, 3, 6, 6, 3]
  duplicados(n, p, w);
  duplicados2(n, p, w);
}

main();
