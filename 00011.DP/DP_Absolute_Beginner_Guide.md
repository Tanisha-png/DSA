# Dynamic Programming (DP) - JavaScript

Dynamic Programming is a problem-solving technique used to solve problems efficiently by breaking them into smaller subproblems and storing their answers so they do not need to be calculated repeatedly.
---

## 1. Why do we need Dynamic Programming?

Imagine you are solving a problem that repeatedly asks for the same smaller calculations.

If you calculate those answers again and again, you waste time.

**Example: Fibonacci**

To calculate `F(5)`, we need `F(4)` and `F(3)`.

To calculate `F(4)`, we need `F(3)` and `F(2)`.

Notice that `F(3)` is needed more than once.

### Repeated work in recursion

```text
                    F(5)
                  /      \
               F(4)      F(3)
              /   \      /   \
           F(3)  F(2)  F(2)  F(1)
           / \
        F(2) F(1)
```

`F(3)` and `F(2)` are calculated repeatedly.

Dynamic Programming avoids this repeated work by **remembering answers to subproblems** and reusing them.

**Main idea:** Calculate a subproblem once, store its answer, and reuse it whenever required.

---

## 2. What is recursion?

Recursion is a technique in which a function calls itself to solve a smaller version of the same problem.

A recursive solution generally needs two things:

1. **Base case:** The condition that stops further recursive calls.
2. **Recursive case:** The part that reduces the problem and calls the function again.

Think of opening nested boxes. Each box contains a smaller box until you reach the final box. The base case is the point where there are no more boxes to open.

### How recursion works

```text
Solve(5)
   |
   v
Solve(4)
   |
   v
Solve(3)
   |
   v
Solve(2)
   |
   v
Solve(1)  <- Base case
```

The function calls move towards the base case. Once it is reached, the answers return back through the previous calls.

**Important:** Recursion and Dynamic Programming are not the same thing. Recursion is a way to express a solution. DP is an optimization technique that is useful when subproblems overlap and their answers can be reused.

---

## 3. What are subproblems?

A subproblem is a smaller version of the original problem.

For example, suppose a person wants to reach step 5 and can climb either one or two steps at a time.

To reach step 5, the person must come from:

- Step 4, by taking one step.
- Step 3, by taking two steps.

Therefore, solving the problem for step 5 depends on solving smaller problems for steps 4 and 3.

```text
                 Reach step 5
                  /         \
          Reach step 4    Reach step 3
             /    \          /    \
          Step 3  Step 2   Step 2  Step 1
```

The same smaller problems appear more than once. These are called **overlapping subproblems**.

### Two important properties of DP

**1. Overlapping subproblems**

The same smaller problems are encountered repeatedly.

**2. Optimal substructure**

The answer to a larger problem can be built using answers to its smaller subproblems.

For example, in House Robber, the maximum money that can be collected up to the current house depends on the best answers for the previous houses.

A problem commonly uses DP when these properties are present.

---

## 4. What is Dynamic Programming?

Dynamic Programming solves a problem by:

1. Breaking it into smaller subproblems.
2. Solving each required subproblem.
3. Storing its answer.
4. Reusing the stored answer instead of calculating it again.

A stored answer is often kept in an array or another data structure called a **DP table**.

### The basic DP idea

```text
          Original Problem
                 |
                 v
          Smaller Problems
                 |
                 v
          Calculate Answers
                 |
                 v
           Store Answers
                 |
                 v
          Reuse When Needed
                 |
                 v
           Final Answer
```

The two common ways to implement DP are **Top-Down** and **Bottom-Up**.

---

## 5. Top-Down DP: Memoization

Top-Down DP starts with the original problem and recursively breaks it into smaller subproblems.

Whenever a subproblem is solved for the first time, its answer is stored in a memoization array or map.

If the same subproblem is needed again, the stored answer is returned immediately.

This technique is called **Memoization**.

### How memoization works

```text
             Start: Solve(5)
                    |
                    v
             Is answer stored?
                /       \
              Yes        No
               |          |
               v          v
          Return it    Solve smaller
                         problems
                            |
                            v
                      Store answer
                            |
                            v
                       Return answer
```

### Key points

1. Uses recursion.
2. Starts from the original problem.
3. Calculates only the states that are needed.
4. Stores calculated answers to avoid repeated work.

**Top-Down = Recursion + Memoization**

---

## 6. Bottom-Up DP: Tabulation

Bottom-Up DP solves smaller subproblems first and uses their answers to solve larger subproblems.

It usually uses loops and a DP array or table.

Instead of starting from the final problem and moving down recursively, it starts from the base cases and builds towards the final answer.

This technique is called **Tabulation**.

### How tabulation works

```text
        Base Cases
             |
             v
       Small Problems
             |
             v
      Medium Problems
             |
             v
       Larger Problems
             |
             v
        Final Answer
```

### Key points

1. Usually uses loops instead of recursion.
2. Starts with known base cases.
3. Fills the DP table in a valid order.
4. Uses previously calculated answers to calculate the next answer.

**Bottom-Up = Start with Base Cases + Fill the DP Table**

---

## 7. Memoization vs Tabulation

| Memoization | Tabulation |
|---|---|
| Top-Down approach | Bottom-Up approach |
| Uses recursion | Usually uses loops |
| Starts with the original problem | Starts with base cases |
| Stores answers when a state is calculated | Fills the table in an order |
| May calculate only required states | Commonly calculates all states in the chosen range |
| Uses recursion call-stack space | Does not use recursive call-stack space |

Both approaches can reduce repeated calculations. The best choice depends on the problem, recursion depth, and implementation requirements.

---

## 8. How to identify and design a DP solution

Before writing code, answer these questions:

| Question | What it means |
|---|---|
| **State** | What does one DP entry represent? |
| **Choices** | What options are available at this point? |
| **Transition** | How can the current answer be calculated from smaller answers? |
| **Base case** | Which smallest answers are already known? |
| **Order** | In what order should the states be calculated? |
| **Final answer** | Which state contains the required result? |

A useful habit is to explain the meaning of the state in one sentence before writing the recurrence.

For example: `memo[i]` represents the answer to the problem for position `i`.

---

# 9. One-Dimensional DP Problems

In one-dimensional DP, the state is represented using a single index, usually an array position or a step number.

The following problems demonstrate how the same DP ideas are applied to different situations.

## Problem 1: Climbing Stairs

**Problem:** A person can climb either one or two steps at a time. Find the number of distinct ways to reach step `n`.

[LeetCode: Climbing Stairs](https://leetcode.com/problems/climbing-stairs/description/)

### Example: n = 5

There are 8 possible ways:

```text
1 + 1 + 1 + 1 + 1
1 + 1 + 1 + 2
1 + 1 + 2 + 1
1 + 2 + 1 + 1
2 + 1 + 1 + 1
1 + 2 + 2
2 + 1 + 2
2 + 2 + 1
```

### Understand the choices

To reach step 5, the final move must be:

1. One step from step 4.
2. Two steps from step 3.

Therefore:

```text
Ways(5) = Ways(4) + Ways(3)
```

In general:

```text
Ways(n) = Ways(n - 1) + Ways(n - 2)
```

### Recursive breakdown

```text
                  Count(5)
                 /        \
            Count(4)     Count(3)
             /   \        /   \
        Count(3) Count(2) Count(2) Count(1)
```

Without storing answers, the same states are calculated repeatedly.

With memoization, each state is calculated once and reused.

### JavaScript solution: Memoization

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const memo = new Array(n+1).fill(-1)

    function Count(i){
        if (i<=1){
            return 1;
        }
        if(memo[i]!== -1){
            return memo[i];
        }
        memo[i] = Count(i-1) + Count(i-2);

        return memo[i];
    }
    return Count(n);

};
```

### Complexity

| Complexity | Value | Reason |
|---|---|---|
| Time | `O(n)` | Each state is calculated once. |
| Space | `O(n)` | Memoization storage and recursion stack. |

---

## Problem 2: Minimum Cost Climbing Stairs

**Problem:** Each stair has a cost. After paying the cost of a stair, you can climb one or two steps. Find the minimum cost to reach the top.

[LeetCode: Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

### Understand the choices

To reach position `i`, you can arrive from:

```text
             Position i
              /      \
       Position i-1  Position i-2
```

You can either:

1. Come from the previous position and pay its cost.
2. Come from two positions back and pay that position's cost.

Choose the option with the smaller total cost.

### DP transition

```text
Solve(i) = min(
    Solve(i - 1) + cost[i - 1],
    Solve(i - 2) + cost[i - 2]
)
```

The base cases are:

```text
Solve(0) = 0
Solve(1) = 0
```

You can start from either of the first two positions without paying a cost to reach that starting position.

### JavaScript solution: Memoization

```javascript
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    const n = cost.length
    const memo = new Array(n+1).fill(-1);

    function Solve(i){
        if (i<=1){
            return 0;
        }

        // if the result is already calculated
        if (memo[i]!== -1){
            return memo[i];
        }

        // if is not yet calculated 
        memo[i] = Math.min(Solve(i-1)+cost[i-1],Solve(i-2)+ cost[i-2]);

        return memo[i];

    }
    return Solve(n);


};
```

### Complexity

| Complexity | Value | Reason |
|---|---|---|
| Time | `O(n)` | Each position is calculated once. |
| Space | `O(n)` | Memoization storage and recursion stack. |

---

## Problem 3: House Robber

**Problem:** You are given an array where each element represents the money in a house. You cannot rob two adjacent houses. Find the maximum amount of money you can rob.

[LeetCode: House Robber](https://leetcode.com/problems/house-robber/)

### Understand the choices

At every house, you have two choices:

**Choice 1: Skip the current house**

Keep the maximum amount calculated up to the previous house.

**Choice 2: Rob the current house**

Add the current house's money to the maximum amount calculated up to the house before the previous one.

Why? Because robbing the current house means you cannot rob the previous house.

### Illustration

```text
House:       0    1    2    3    4
Money:       2   12   24   25   27

At each house:
             /             \
           Skip            Rob
       Previous best   Two-back best
                       + current money
```

### DP transition

```text
Solve(i) = max(
    Solve(i - 1),
    Solve(i - 2) + nums[i]
)
```

Base case:

```text
Solve(i) = 0, when i < 0
```

### JavaScript solution: Memoization

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */

//  2 12 24 25 27 
var rob = function(nums) {
    const n = nums.length;
    const memo = new Array(n+1).fill(-1);

    function Solve(i){
        if (i<0){
            return 0;
        }

        if (memo[i]!==-1){
            return memo[i];
        }

        memo[i] = Math.max(Solve(i-1), Solve(i-2)+ nums[i]);

        return memo[i];
    }

    return Solve(n-1);


};
```

### Complexity

| Complexity | Value | Reason |
|---|---|---|
| Time | `O(n)` | Each house index is calculated once. |
| Space | `O(n)` | Memoization storage and recursion stack. |

---
### Before solving a DP problem, ask yourself

1. What does my state represent?
2. What choices can I make?
3. How do those choices lead to smaller states?
4. What are the base cases?
5. What is the transition?
6. Which state contains the final answer?
7. What are the time and space complexities?

