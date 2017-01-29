"use strict";
import linkedList from "./linkedList";

function hashTable(){
  const table = [];

  function valuePair(key, value) {
    function toString() {
      return "[" + key + " - " + value +"]";
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
      table[position] = linkedList();
    }

    table[position].append(valuePair(key, value));
    return true;
  }

  function get(key) {
    const position = djb2HashCode(key);

    if (table[position] !== undefined) {
      let current = table[position].getHead();

      while (current.next) {
        if (current.value.key === key) {
          return current.value.value;
        }
        current = current.next;
      }
      // Check if first or last element
      if (current.value.key === key) {
        return current.value.value;
      }
    }

    return undefined;
  }

  function remove(key) {
    const position = djb2HashCode(key);

    if (table[position] !== undefined) {
      let current = table[position].getHead();
      while (current.next) {
        if (current.value.key === key) {
          table[position].remove(current.value);
          if (table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      // Check if first or last element
      if (current.value.key === key) {
        table[position].remove(current.value);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true;
      }
    }

    return false;
  }

  return { put, get, remove };
}

export default hashTable;
