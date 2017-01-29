"use strict";

function hashTable(){
  const table = [];

  function djb2HashCode(key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }

    // asuming the size of the table to be around 1000
    return hash % 1013;
  }

  function put(key, value) {
    table[djb2HashCode(key)] = value;
    return true;
  }

  function get(key) {
    return table[djb2HashCode(key)];
  }

  function remove(key) {
    if (table[djb2HashCode(key)] !== undefined) {
      table[djb2HashCode(key)] = undefined;
      return true;
    } else {
      return false;
    }
  }

  return { put, get, remove };
}

export default hashTable;
