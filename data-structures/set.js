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

  function union(otherSet) {
    const unionSet = set();
    let vals = values();

    for (let i = 0; i < vals.length; i++) {
      unionSet.add(vals[i]);
    }

    vals = otherSet.values();

    for (let i = 0; i < vals.length; i++) {
      unionSet.add(vals[i]);
    }

    return unionSet;
  }

  function intersection(otherSet) {
    const intersectionSet = set();
    const vals = values();

    for (let i = 0; i < vals.length; i++) {
      if (otherSet.has(vals[i])) {
        intersectionSet.add(vals[i]);
      }
    }

    return intersectionSet;
  }

  function difference(otherSet) {
    const differenceSet = set();
    const vals = values();

    for (let i = 0; i < vals.length; i++) {
      if (!otherSet.has(vals[i])) {
        differenceSet.add(vals[i]);
      }
    }

    return differenceSet;
  }

  function subset(otherSet) {
    if (size() > otherSet.size()) {
      return false;
    }

    const vals = values();

    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(vals[i])) {
        return false;
      }
    }

    return true;
  }

  return { has, add, remove, clear, size, values, union, intersection, difference, subset };
}

export default set;
