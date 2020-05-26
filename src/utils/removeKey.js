// Remove a key from an object
function remove(obj, key) {
  for (var k in obj) {
    if (k == key) {
      delete obj[key];
      return true;
    } else if (typeof obj[k] === "object") {
      if (remove(obj[k], key)) return true;
    }
  }
  return false;
}

export default remove;
