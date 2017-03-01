"use strict";

function dictionary() {
  const items = {};

  function set(key, value) {
    items[key] = value;
    return true;
  }

  function remove(key) {
    if (has(key)) {
      delete items[key];
      return true;
    }
    return false;
  }

  function has(key) {
    return items.hasOwnProperty(key);
  }

  function get(key) {
    return items[key];
  }

  function clear() {
    for (let i = 0; i < keys().length; i++) {
      remove(keys[i]);
    }
    return true;
  }

  function size() {
    return keys().length;
  }

  function keys() {
    return Object.keys(items);
  }

  function values() {
    const vals = [];
    for (let i = 0; i < keys().length; i++){
      vals.push(items[keys()[i]]);
    }

    return vals;
  }

  return { set, remove,  has, get, clear, size, keys, values };
}

export default dictionary;
