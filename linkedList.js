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

  function insert(position, value){}

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
