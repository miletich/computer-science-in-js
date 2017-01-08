function stack() {
  const items = [];

  function push(item){
    return items.push(item);
  }

  function pop(){
    return items.pop();
  }

  function peek(){
    return items[items.length-1];
  }

  function isEmpty(){
    return items.length === 0;
  }

  function size(){
    return items.length;
  }

  function clear(){
    items = [];
    return true;
  }

  function toString(){
    return items.toString();
  }

  return { push, pop, peek, isEmpty, size, clear, toString };
}

export default stack;
