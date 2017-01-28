"use strict";

function set() {
  const items = {};

  function has(value) {
    return items.hasOwnProperty(value);
  }

  function add(value) {
    if (!has(value)) {
      items[value] = value;
      return true;
    } else {
      return false;
    }
  }

  function remove(value) {
    if (has(value)) {
      delete items[value];
      return true;
    } else {
      return false;
    }
  }

  function clear() {
    const keys = Object.keys(items);

    if (keys.length > 0) {
      for (let i = 0; i < keys.length; i++) {
        delete items[keys[i]];
      }
      return true;
    } else {
      return false;
    }
  }

  function size() {
    return Object.keys(items).length;
  }

  function values() {
    return Object.keys(items);
  }

  return { has, add, remove, clear, size, values };
}

export default set;
