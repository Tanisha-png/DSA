/*
 * VERIFY NUMBERS INSTRUCTIONS:
 * Declare a function "verifyNums" which takes in one number and two callbacks.
 * The first callback will represent a success condition, and the second will represent an error.
 * "verifyNums" will return a function that takes in an array of numbers.
 * If the returned function is invoked with an array whose elements sum up to the initially passed-in number, it should run the "success" callback and return its result.
 * Otherwise, return the result of the "error" callback.
 *
 * ex.
 * const success = () => '200: OK';
 * const error = () => '400: Error';
 * const errorCheckingFunc = verifyNums(10, success, error);
 * errorCheckingFunc([3, 3, 5, -1]) --> '200: OK'
 * errorCheckingFunc([7, 6, 11]) --> '400: Error'
 */

/**
 * Creates a function that verifies if an array of numbers sums to a target value.
 * @param num - The target sum to check against
 * @param success - Callback to run when the sum matches the target
 * @param error - Callback to run when the sum doesn't match the target
 * @returns A function that takes an array of numbers and returns the result of the appropriate callback
 */

// i: one number and two callbacks
// o: return a function that takes in an array of numbers

function verifyNums<T, E>(
  num: number,
  success: () => T, // callback
  error: () => E, // callback
): (arr: number[]) => T | E {
  // Return a function that takes an array of numbers
  /*
    Inside the function: code block
      - add all the elements in the array
      - check if sum is equal to the num(target)
        => return success
      - otherwise
        => return error
  */

  return (arr: number[]): T | E => {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);

    if (sum === num) {
      return success();
    } else {
      return error();
    }
  };
}

// Test case
const check = verifyNums(
  10,
  () => "success!",
  () => "error",
);
console.log("Test Success:", check([5, 5]));
console.log("Test Error:", check([1, 2, 3]));

/*
 * FLATTENED VALUES INSTRUCTIONS:
 * Declare a function "flattenedValues" that takes an object as an argument. This object may contain any level of nesting.
 * "flattenedValues" should return a **flat** array (1 level deep) containing every value stored in the object.
 *
 * ex.
 * const obj = { a: 1, b: 2, c: {d: 3, e: {f: 4}}};
 * flattenedValues(obj) --> [1, 2, 3, 4];
 */

interface NestedObject {
  [key: string]: number | NestedObject;
}

/**
 * Flattens all values from a nested object into a single-level array.
 * @param obj - An object that may contain nested objects at any depth
 * @returns A flat array containing all values from the object and its nested objects
 */

// i: an object
// o: return a flat array

function flattenedValues(obj: NestedObject): number[] {
  // declare a variable and assign it an empty array
  let array: number[] = [];
}

/*
 * SPLIT SUM INSTRUCTIONS:
 * Declare a function "splitSum" which takes an array of numbers, a callback, and a single number as arguments.
 * "splitSum" should iterate through the array and run the callback on each element.
 * It should return an array containing two numbers: the sum of all callback results that are **less** than the provided number, the sum of all results that are **greater** than that number.
 * Any results that equal the number should not be added to either of these sums.
 *
 * ex.
 * const multiplyBy2 = (num) => num * 2;
 * splitSum([4, 9, 27, -11, 7, -2, 43], multiplyBy2, 14); --> [-18, 158]
 */

/**
 * Splits array elements based on callback results compared to a threshold value.
 * @param array - An array of numbers to process
 * @param callback - A function that takes a number and returns a number
 * @param num - The threshold number to compare callback results against
 * @returns A tuple where the first element is the sum of callback results less than num,
 *          and the second element is the sum of callback results greater than num
 */

// i: array of numbers, a callback, and a number
// o: return an array containing two numbers

function splitSum(
  array: number[],
  callback: (num: number) => number,
  num: number,
): [number, number] {
  // declare two variables: one for less than and one for greater than
  let lessThan = 0;
  let greaterThan = 0;

  // iterate through the array using for of loop (iterate through each element)
  for (const el of array) {
    // make sure to apply the callback
    const result = callback(el);

    // check if the result is less than the num
    if (result < num) {
      // add to the lessThan total
      lessThan += result;
    } else if (result > num) {
      // add the greaterThan total
      greaterThan += result;
    }
  }
  // return the two sums
  return [lessThan, greaterThan];
}

// Test case:
const multiplyBy2 = (num: number) => num * 2;
console.log(splitSum([2, 4, 6, 8], multiplyBy2, 4));

export { verifyNums, flattenedValues, splitSum };

class BinarySearchTree {
  value: number;
  right: BinarySearchTree | null;
  left: BinarySearchTree | null;

  constructor(value: number) {
    this.value = value;
    this.right = null;
    this.left = null;
  }

  add(...values: number[]): void {}

  depth(): number {}
}

export { BinarySearchTree };

