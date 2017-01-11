"use strict";

function circularDoublyLinkedList(){
  let head = null,
    tail = null;

  function node(value){
    let next = null,
      previous = null;
    return { value, next, previous };
  }

  function append(value){
    const newNode = node(value);

    if (head === null) {
      newNode.next = newNode;
      newNode.previous = newNode;
      head = newNode;
      tail = newNode;
    } else {
      tail.next = newNode;
      head.previous = newNode;
      newNode.previous = tail;
      newNode.next = head;
      tail = newNode;
    }
    return true;
  }

  function insert(position, value){
    if (position >= 0 && position < size()) {
      const newNode = node(value);
      let current = head,
        previous,
        index = 0;

      if (position === 0) {

        if (head === null) {
          head = newNode;
          tail = newNode;
        } else {
          head = newNode;
          current.previous = newNode;
          head.next = current;
        }

      } else if (position === size() -1) {

        current = tail;
        current.next = newNode;
        tail = newNode;
        tail.previous = current;

      } else {

        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = newNode;
        newNode.previous = previous;
        newNode.next = current;
        current.previous = newNode;
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
        if (size() === 1) {
          head = null;
          tail = null;
        } else {
          head = head.next;
          head.previous = null;
        }
      } else if (position === size() -1) {
        current = tail;
        tail = current.previous;
        tail.next = null;

      } else {

        while (index < position) {
          index++;
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.previous = previous;
      }

      return current.value;

    } else {
      return null;
    }
  }

  function remove(value){
    return removeAt(indexOf(value));
  }

  function getHead(){
    return head;
  }

  function getTail(){
    return tail;
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
    tail = null;
    return true;
  }

  function toString(){
    return function makeString(current = head, str = ""){
      return (current === head && str)
        ? str
        : makeString(current.next, str + current.value + "\n");
    }();
  }

  return { append, insert, removeAt, remove, getHead, getTail, indexOf, size, isEmpty, clear, toString };
}

export default circularDoublyLinkedList;
