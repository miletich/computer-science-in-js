"use strict";

function hashTable(){
  const table = [];

  function valuePair(key, value) {
    function toString(){
      return "[" + key + " - " + value + "]";
    }
    return { key, value, toString };
  }

  function djb2HashCode(key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }

    // asuming the size of the table to be around 1000
    return hash % 1013;
  }

  function put(key, value) {
    const position = djb2HashCode(key);
    if (table[position] === undefined) {
      table[position] = valuePair(key, value);
      return true;
    } else {
      let index = position;
      while (table[index] !== undefined) {
        index++;
      }
      table[index] = valuePair(key, value);
    }
    return true;
  }

  function get(key) {
    const position = djb2HashCode(key);
    let index = position;

    while (table[index] !== undefined) {
      if (table[index] && table[index].key === key) {
        return table[index].value;
      }
      index++;
    }

    return undefined;
  }

  function remove(key) {
    const position = djb2HashCode(key);
    let index = position;

    while (table[index] !== undefined) {
      if (table[index] && table[index].key === key) {
        table[index] = null;
        return true;
      }
      index++;
    }

    return false;
  }

  return { put, get, remove };
}

export default hashTable;
