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

  function removeAt(position){
    if (position >= 0 && position <= size()) {

      if (position === 0) {
        head = head.next;
        return true;
      } else {
        let current = head,
            previous,
            index = 0;

        while (index < position) {
          index++;
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        return true;
      }

    } else {
      return false;
    }
  }

  function remove(value){
    return removeAt(indexOf(value));
  }

  function getHead(){
    return head;
  }

  function indexOf(value){
    return function position(current = head, count = 0){
      return current === null
        ? null
        : value === current.value
          ? count
          : position(current.next, ++count);
    }();
  }

  function size(){
    return function length(current = head, count = 0){
      return current === null
        ? count
        : length(current.next, ++count);
    }();
  }

  function isEmpty(){
    return size() === 0;
  }

  function clear(){
    head = null;
    return true;
  }

  function toString(){
    return function makeString(current = head, str = ''){
      return current === null
        ? str
        : makeString(current.next, str + current.value + "\n");
    }();

  return { append, insert, removeAt, remove, getHead, indexOf, size, isEmpty, clear, toString };
}

export default linkedList;
