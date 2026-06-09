/*
================================================================================
Loops covered:
  1. for
  2. while
  3. do...while
  4. for...in
  5. for...of
  6. forEach
================================================================================
*/

const fruits = ["apple", "banana", "cherry"];


// ============================================================================
// 1. FOR LOOP — "When you know exactly how many times to run"
// ============================================================================
// Classic loop: you set start, condition, and step yourself.
console.log("================ FOR LOOP ================");

for (let i = 0; i < fruits.length; i++) {
    console.log(i, fruits[i]);
}
// Output: 0 apple, 1 banana, 2 cherry
//
// You control the index (i) completely. Perfect for anything that needs a counter.


// ============================================================================
// 2. WHILE LOOP — "Run AS LONG AS a condition is true"
// ============================================================================
// Use when you don't know the exact number of iterations in advance.
console.log("\n================ WHILE LOOP ================");

let j = 0;
while (j < fruits.length) {
    console.log(j, fruits[j]);
    j++;
}
// Output: 0 apple, 1 banana, 2 cherry
//
// The condition is checked BEFORE each iteration.
// If condition is false from the start, the loop NEVER runs (useful sometimes).


// ============================================================================
// 3. DO...WHILE LOOP — "Run AT LEAST ONCE, then check condition"
// ============================================================================
// Same as while, but the body executes before the first condition check.
console.log("\n================ DO...WHILE LOOP ================");

let k = 0;
do {
    console.log(k, fruits[k]);
    k++;
} while (k < fruits.length);
// Output: 0 apple, 1 banana, 2 cherry
//
// Guarantees at least one execution. Great for menus or user input.
// Even if the array were empty, the body would run once (try changing to [ ]).


// ============================================================================
// 4. FOR...IN LOOP — "INdex" / Iterates over KEYS (object properties)
// ============================================================================
console.log("\n================ FOR...IN ================");

for (const key in fruits) {
    console.log(key);               // logs 0, 1, 2 (the indexes)
}
// If you want the values, use fruits[key].
for (const key in fruits) {
    console.log(key, fruits[key]);  // 0 apple, 1 banana, 2 cherry
}

// WHERE IT SHINES: Objects
const person = { name: "John", age: 25 };
for (const key in person) {
    console.log(key, person[key]);  // name John, age 25
}

// CAUTION: Avoid on arrays if custom properties are added.
const numbers = [10, 20, 30];
numbers.custom = "extra";
for (const x in numbers) {
    console.log(x);                 // 0, 1, 2, "custom"  ← unexpected!
}


// ============================================================================
// 5. FOR...OF LOOP — "Value OF collection" / Direct values
// ============================================================================
console.log("\n================ FOR...OF ================");

for (const fruit of fruits) {
    console.log(fruit);             // apple, banana, cherry
}
// Need index? Use .entries()
for (const [index, fruit] of fruits.entries()) {
    console.log(index, fruit);      // 0 apple, 1 banana, 2 cherry
}
// Clean, supports break/continue, and ignores custom properties.


// ============================================================================
// 6. FOREACH — Array METHOD that runs a function for EACH element
// ============================================================================
console.log("\n================ FOREACH ================");

fruits.forEach((fruit) => {
    console.log(fruit);             // apple, banana, cherry
});
// Index is the second parameter automatically:
fruits.forEach((fruit, index) => {
    console.log(index, fruit);      // 0 apple, 1 banana, 2 cherry
});
// ⚠️ CANNOT use break or continue inside forEach!
// fruits.forEach(f => { if(f==="banana") break; }); // Syntax Error


// ============================================================================
// SAME PROBLEM, ALL 6 WAYS (print "index fruit")
// ============================================================================
console.log("\n------- FOR -------");
for (let i = 0; i < fruits.length; i++) console.log(i, fruits[i]);

console.log("------- WHILE -------");
let w = 0;
while (w < fruits.length) console.log(w, fruits[w++]);

console.log("------- DO...WHILE -------");
let d = 0;
do { console.log(d, fruits[d]); d++; } while (d < fruits.length);

console.log("------- FOR...IN -------");
for (const key in fruits) console.log(key, fruits[key]);

console.log("------- FOR...OF -------");
for (const [i, f] of fruits.entries()) console.log(i, f);

console.log("------- FOREACH -------");
fruits.forEach((f, i) => console.log(i, f));


// ============================================================================
// COMPARISON TABLE – Which loop can do what?
// ============================================================================
/*
┌──────────────────────┬───────────┬───────────┬───────────┬───────────┬───────────┬──────────┐
│       Feature        │   for     │   while   │ do...while│ for...in  │ for...of  │ forEach  │
├──────────────────────┼───────────┼───────────┼───────────┼───────────┼───────────┼──────────┤
│ Works on arrays      │ Yes       │ Yes       │ Yes       │ Yes (⚠)    │ Yes ✔     │ Yes ✔    │
│ Works on objects     │ No        │ No        │ No        │ Yes ✔      │ No        │ No       │
│ Provides index/      │ You       │ You       │ You       │ Yes (key)  │ Only with │ Yes      │
│ counter directly     │ control   │ control   │ control   │            │ .entries()│ (2nd arg) │
│ Supports break       │ Yes       │ Yes       │ Yes       │ Yes        │ Yes       │ No ❌    │
│ Supports continue    │ Yes       │ Yes       │ Yes       │ Yes        │ Yes       │ No ❌    │
│ Runs at least once   │ Possible  │ No        │ Yes ✔      │ No         │ No        │ No       │
│ (guaranteed)         │ (with do) │           │            │            │           │          │
│ Best for             │ Counting, │ Unknown   │ Menus,     │ Objects    │ Array     │ Callback │
│                      │ index     │ length,   │ at-least-  │ (not arrays│ values    │ style    │
│                      │ control   │ streaming │ once tasks │ generally) │           │          │
└──────────────────────┴───────────┴───────────┴───────────┴───────────┴───────────┴──────────┘
*/


// ============================================================================
// WHICH LOOP TO USE? – Simple Rules
// ============================================================================
/*
  1. Need a counter / exact number of runs?
     → for

  2. Condition may change while running / unknown iterations?
     → while

  3. Must execute at least once, then check condition?
     → do...while

  4. Iterating over object properties?
     → for...in

  5. Simple array values, need break/continue?
     → for...of

  6. Functional style, every element, no break needed?
     → forEach
*/


// ============================================================================
// MEMORY TRICKS (never mix them up again)
// ============================================================================
/*
   for           → "for a counted number of times"
   while         → "while this is true, keep going"
   do...while    → "do this, while that is true (at least once)"
   for...in      → "IN = INdex" (or "INside an object's keys")
   for...of      → "OF = value OF the collection"
   forEach       → "for EACH element, run this function"
*/