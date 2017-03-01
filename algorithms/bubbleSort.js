function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    //subtract number of passes to make the algotith more efficient
    for (let j = 0; j < array.length -1 -i; j++) {
      if (array[j] > array[j+1]) {
        swap(array, j, j+1);
      }
    }
  }
}

function swap(array, index1, index2) {
  [array[index1], array[index2]] = [array[index2], array[index1]];
}
