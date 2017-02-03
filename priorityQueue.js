"use strict";

function priorityQueue(){
  const items = [];

  function enqueue(value, priority){
    const item = { value, priority };

    if (items.length === 0) {
      return items.push(item);
    } else {
      for (let i = 0; i < items.length; i++) {
        if (item.priority < items[i].priority) {
          items.splice(i, 0, item);
          //normalise behaviour
          return items.length;
        }
      }
    }
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
    let str = "";
    items.forEach((item) => str += item.value + ": " + item.priority);
    return str;
  }

  return { enqueue, dequeue, front, size, isEmpty, clear, toString };
}

export default priorityQueue;
