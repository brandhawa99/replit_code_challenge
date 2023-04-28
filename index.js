function isValid(stale, latest, otjson) {
  let str = stale;
  let pos = 0; // position is 0 at the beginning 
  
  // Loop through objects in otjson Array 
  for(let i = 0 ; i < otjson.length; i++){
    // extract values from otjson at current index
    const {op, count, chars} = otjson[i]; 
    // Skip block
    if(op === "skip"){
      if(pos + count > str.length){
        // positon is past end
        return false; 
      }
      // change postion by the count 
      pos += count; 
    }
    // delete block 
    if(op == "delete"){
      if(pos + count > stale.length){
        // deleting  past end
        return false; 
      }
      // get beginning of string to the current position
      let str1 = str.substring(0, pos); 
      // get part of string past the part being removed
      let str2 = str.substring(pos+count, str.length);
      // combine those two part together to remove section
      str = "".concat(str1,str2)
    }
    // insert block 
    if(op === "insert"){
      // get beginning
      let str1 = str.substring(0,pos);
      // get end 
      let str2 = str.substring(pos, str.length)
      // combine all the sections of the str together
      str = "".concat(str1,chars,str2)
      // change position based on chars length
      pos += chars.length;
    }
  }
  if(str === latest){
    return true; 
  }else {
    return false
  }

}


console.log(
  isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations.',
  [{"op": "skip", "count": 40}, {"op": "delete", "count": 47}]
)
)
console.log(
  isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations.',
  [{"op": "skip", "count": 45}, {"op": "delete", "count": 47}]
)
)
console.log(
  isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations.',
  [{"op": "skip", "count": 40}, {"op": "delete", "count": 47}, {"op": "skip", "count": 2}]
)
)
console.log(
  isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'We use operational transformations to keep everyone in a multiplayer repl in sync.',
  [{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]
)
  
)
console.log(
  isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'We can use operational transformations to keep everyone in a multiplayer repl in sync.',
  [{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]
)
)
console.log(
  isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  []
)
)


 // true
 // false, delete past end
 // false, skip past end
 // true
 // false
 // true
