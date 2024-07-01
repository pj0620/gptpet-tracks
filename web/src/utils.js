export const roundNum = (x) => {
  if (x === null || x === undefined) return "???";
  else return (Math.round(x * 100) / 100).toFixed(2);
}

/**
 * adds to array but keeps max length to maxLen
 * 
 * @param {Array<any>} arr - arr to append to
 * @param {any} val - new value to append
 * @param {number} maxLen - max length of array
 */
export const appendMaxLen = (arr, val, maxLen) => {
  arr.push(val);
  if (arr.length > maxLen) {
    arr.shift();
  }
}