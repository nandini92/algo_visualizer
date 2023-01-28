import { Moments } from "../model";

let auxiliaryArray: number[];
let moments: Moments[] = [];

// Function to sort and merge left and right halves
const merge = (array:number[], start:number, mid:number, end:number) => {
  let i: number = start;
  let j: number = mid + 1;

  for (let k = start; k <= end; k++) {
    auxiliaryArray[k] = array[k];
  }

  console.log("auxiliary:" + auxiliaryArray ,"i, j:", [i, j]);

  for (let k = start; k <= end; k++) {
    moments.push({ wholeArray: [...array], highlighted: [k, i, j] });


    // NOTE: If i > mid OR j > end, that means in the previous loop last element of j was added OR last element of i was added and remaining index on the other side needs to be added.
    if (i > mid) {
      console.log("i > mid: " , i , mid, "auxiliaryArray[j]:",  auxiliaryArray[j]);
      array[k] = auxiliaryArray[j++];
    } else if (j > end) {
      console.log("j > end: " , j , end, "auxiliaryArray[i]:" , auxiliaryArray[i]);
      array[k] = auxiliaryArray[i++];
    } else if (auxiliaryArray[j] < auxiliaryArray[i]) {
      console.log("auxiliaryArray[j] < auxiliaryArray[i]: " , auxiliaryArray[j] , auxiliaryArray[i]);
      array[k] = auxiliaryArray[j++];
    } else {
      console.log("auxiliaryArray[i] < auxiliaryArray[j]:  " , auxiliaryArray[i] , auxiliaryArray[j]);
      array[k] = auxiliaryArray[i++];
    }

    console.log("array:", array ,"k, i, j:", [k, i, j]);
  }
};

// Function to "sort" array. This method stores the indices of the elements that need to be sorted, as opposed to the legacy way of recursively splitting array into 2 smaller arrays. This way has better space complexity and stores the original indices to be tracked for the animation.
// i.e. start = starting index of array, end = ending index of array
const sort = (array: number[], start: number, end: number) => {
  if (start >= end) return;

  let mid: number = Math.floor(start + (end - start) / 2);

  sort(array, start, mid); // sort the left half
  sort(array, mid + 1, end); // sort the right half

  console.log(array, start, mid, end);

  merge(array, start, mid, end); // merge results
};

// Function to split arrays into smaller arrays
export const mergeSort = (array: number[]): Moments[] => {
  moments.push({ wholeArray: [...array], highlighted: [] });

  // Fill dummy values into auxiliary array such that auxiliary array is of the same length as input array
  auxiliaryArray = new Array(array.length).fill(0);

  sort(array, 0, array.length - 1);

  moments.push({ wholeArray: [...array], highlighted: [] });

  return moments;
};
