"use strict";
import stack from "./stack";

// Decimal to binary coverter
const toBinary = callRight(baseConverter, 2);

// Decimal to hexadecimal coverter
const toHexadecimal = callRight(baseConverter, 16);

// ... and so on

// Usage
toBinary(30); // 11110
toHexadecimal(30); // 1E


// Base coverter
function baseConverter(decNum, base){
  const remainderStack = stack();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let remainder;

  while (decNum > 0){
    remainder = Math.floor(decNum % base);
    remainderStack.push(remainder);
    decNum = Math.floor(decNum / base);
  }

  while (!remainderStack.isEmpty()){
    result += digits[remainderStack.pop()];
  }

  return result;

}

// Helper function
function callRight(fn, ...args){
  return function(...remainingArgs){
    return fn(...remainingArgs, ...args);
  };
}
