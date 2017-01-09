"use strict";

function queue(){
  const items = [];

  function enqueue(item){
    return items.push(item);
  }

  function dequeue(){
    return items.shift();
  }

  function front(){
    return items[0];
  }

  function size(){
    return items.length;
  }

  function isEmpty(){
    return items.length === 0;
  }

  function clear(){
    items.length = 0;
    return true;
  }

  function toString(){
    return items.toString();
  }

  return { enqueue, dequeue, front, size, isEmpty, clear, toString };
}

default export queue;
