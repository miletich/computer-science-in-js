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

      while (current.next !== head) {
        current = current.next;
      }

      current.next = newNode;
    }

    //complete the circle
    newNode.next = head;
  }

  function insert(position, value){
    if (position >= 0 && position <= size()) {
      const newNode = node(value);
      let current = head,
        previous,
        index = 0;

      if (position === 0) {
        head = newNode;

        if (head === null) {
          head.next = head;
        } else {
          head.next = current;

          //complete the circle
          while (current.next !== head) {
            current = current.next;
          }
          current.next = head;
        }

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
    if (position >= 0 && position < size()) {
      let current = head,
        previous,
        index = 0;

      if (position === 0) {

        while (current.next !== head) {
          current = current.next;
        }
        current.next = head.next;
        head = head.next;

      } else {

        while (index < position) {
          index++;
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      return true;

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
      return (current === head && count)
        ? null
        : value === current.value
          ? count
          : position(current.next, ++count);
    }();
  }

  function size(){
    return function length(current = head, count = 0){
      return (current === head && count)
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
    return function makeString(current = head, str = ""){
      return (current === head && str)
        ? str
        : makeString(current.next, str + current.value + "\n");
    }();
  }

  return { append, insert, removeAt, remove, getHead, indexOf, size, isEmpty, clear, toString };
}

export default linkedList;
