"use strict";

function linkedList(){
  let head = null;

  function node(value){
    let next = null;
    return { value, next };
  }

  function append(value){
    const newNode = node(value);

    if (head === null) {
      head = newNode;
    } else {
      let current = head;

      while (current.next) {
        current = current.next;
      }

      current.next = newNode;
    }
  }

  function insert(position, value){
    if (position >= 0 && position <= size()) {
      const newNode = node(value);
      let current = head,
        previous,
        index = 0;

      if (position === 0) {
        head = newNode;
        head.next = current;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = newNode;
        newNode.next = current;
      }

      return true;

    } else {
      return false;
    }
  }

  function removeAt(position){}

  function remove(value){}

  function getHead(){}

  function indexOf(){}

  function size(current = head, count = 0){
    return current === null
      ? count
      : size(current.next, ++count);
  }

  function isEmpty(){}

  function clear(){}

  function toString(){}
}

export default linkedList;
