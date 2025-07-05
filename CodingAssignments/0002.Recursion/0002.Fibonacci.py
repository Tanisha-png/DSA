"""
Fibonacci Series Coding Questions
========================================

# 1. Print the First N Fibonacci Numbers
# -------------------------------------
# Description: Write a function to print the first N numbers in the Fibonacci Series
# (starting with 0 or 1).
# Constraints:
#     - 0 <= n <= 10^5
# Examples:
#     Input: n = 5
#     Output: [0, 1, 1, 2, 3] or [1, 1, 2, 3, 5]
# Follow-up: Modify bonacci Number
# ------------------the function to return the series as an array.

# 2. Find the Nth Fi--------------
# Description: Write a function to compute the Nth Fibonacci number.
# Constraints:
#     - 0 <= n <= 10^5
# Examples:
#     Input: n = 6
#     Output: 8 (for 0-based: 0, 1, 1, 2, 3, 5, 8)
# Follow-up: Handle large N and avoid overflow using modulo arithmetic
# (e.g., return answer % 10^9 + 7).

# 3. Check if a Number is a Fibonacci Number
# -----------------------------------------
# Description: Given a number, write a function to check if it is a Fibonacci number.
# Hint: A number is Fibonacci if and only if (5n^2 + 4) or (5n^2 - 4) is a perfect square.
# Constraints:
#     - 0 <= num <= 10^9
# Examples:
#     Input: num = 5
#     Output: True (5 is in the series)
#     Input: num = 7
#     Output: False

# 4. Sum of First N Fibonacci Numbers
# -----------------------------------
# Description: Write a function to compute the sum of the first N Fibonacci numbers.
# Constraints:
#     - 0 <= n <= 10^5
# Examples:
#     Input: n = 5
#     Output: 7 (0 + 1 + 1 + 2 + 3 = 7)
# Follow-up: Optimize for large N.

# ===============================
# Medium Coding Questions
# ===============================

# 5. Nth Fibonacci Number with O(1) Space
# ---------------------------------------
# Description: Write a function to find the Nth Fibonacci number using constant space
# (no arrays or recursion stack).
# Constraints:
#     - 0 <= n <= 10^5
# Examples:
#     Input: n = 10
#     Output: 55
# Follow-up: Optimize the time complexity to O(log N) using matrix exponentiation.

# 6. Fibonacci Series in a Given Range
# ------------------------------------
# Description: Given a range [low, high], write a function to print all Fibonacci
# numbers within that range.
# Hint: Find the index of the first Fibonacci number >= low and iterate until exceeding high.
# Constraints:
#     - 0 <= low <= high <= 10^9
# Examples:
#     Input: low = 10, high = 100
#     Output: [13, 21, 34, 55, 89]

# 7. Last Digit of Nth Fibonacci Number
# -------------------------------------
# Description: Write a function to find the last digit of the Nth Fibonacci number.
# Hint: Observe the cyclic pattern of last digits (period of 60 for single digits).
# Constraints:
#     - 0 <= n <= 10^18
# Examples:
#     Input: n = 7
#     Output: 3 (F(7) = 13, last digit is 3)

# 8. Count Fibonacci Numbers in an Array
# --------------------------------------
# Description: Given an array of integers, write a function to count how many numbers
# are Fibonacci numbers.
# Constraints:
#     - 1 <= arr.length <= 10^5
#     - 0 <= arr[i] <= 10^9
# Examples:
#     Input: arr = [1, 4, 5, 8, 10]
#     Output: 3 (1, 5, 8 are Fibonacci)
# Follow-up: Optimize by precomputing Fibonacci numbers up to the maximum array value.

# ===============================
# Hard Coding Questions
# ===============================

# 9. Matrix Exponentiation for Nth Fibonacci
# -----------------------------------------
# Description: Implement a function to compute the Nth Fibonacci number using matrix
# exponentiation in O(log N) time.
# Constraints:
#     - 0 <= n <= 10^18
# Examples:
#     Input: n = 10
#     Output: 55
# Follow-up: Handle very large N with modulo arithmetic.

# 10. Fibonacci Sum for Large Numbers
# -----------------------------------
# Description: Given a number N, find the smallest number of Fibonacci numbers that
# sum up to N.
# Hint: Use a greedy approach by subtracting the largest possible Fibonacci number.
# Constraints:
#     - 1 <= n <= 10^9
# Examples:
#     Input: n = 17
#     Output: 3 (17 = 13 + 3 + 1)

# 11. Longest Fibonacci Subsequence
# ---------------------------------
# Description: Given an array of integers, find the length of the longest subsequence
# that forms a Fibonacci-like sequence (where each number is the sum of the two preceding ones).
# Hint: Use dynamic programming with a hash map to check pairs.
# Constraints:
#     - 3 <= arr.length <= 1000
#     - 1 <= arr[i] <= 10^9
# Examples:
#     Input: arr = [1, 2, 3, 5, 8, 13]
#     Output: 6 (entire array is Fibonacci-like)

# 12. Fibonacci Number with Minimum Cost
# --------------------------------------
# Description: Given an array of costs where cost[i] is the cost of using the ith
# Fibonacci number, find the minimum cost to represent a number N as a sum of Fibonacci numbers.
# Hint: Use dynamic programming or a modified greedy approach.
# Constraints:
#     - 1 <= n <= 10^9
#     - 1 <= cost.length <= 100
#     - 1 <= cost[i] <= 10^6
# Examples:
#     Input: n = 10, cost = [1, 2, 3, 4, 5]
#     Output: 5 (10 = 5 + 5, cost[4] + cost[4] = 5)

# ===============================
# Additional Variations and Follow-ups
# ===============================

# 13. Handle Negative Indices
# ---------------------------
# Description: Extend the Fibonacci Series to negative indices
# (F(-n) = (-1)^(n+1) * F(n)) and write a function to compute F(n) for any integer n.
# Constraints:
#     - -10^5 <= n <= 10^5
# Examples:
#     Input: n = -5
#     Output: -5 (F(-5) = (-1)^(5+1) * F(5) = 1 * -5)

# 14. Fibonacci with Custom Starting Values
# ----------------------------------------
# Description: Write a function to generate a Fibonacci-like sequence where the first
# two numbers are provided as input.
# Constraints:
#     - 0 <= n <= 10^5
#     - -10^9 <= a, b <= 10^9
# Examples:
#     Input: a = 2, b = 3, n = 5
#     Output: [2, 3, 5, 8, 13]

# 15. Modular Fibonacci for Large N
# --------------------------------
# Description: Compute the Nth Fibonacci number modulo M for very large N.
# Hint: Use the Pisano period to reduce the problem size.
# Constraints:
#     - 0 <= n <= 10^18
#     - 2 <= m <= 10^5
# Examples:
#     Input: n = 10, m = 1000
#     Output: 55 (F(10) = 55)
"""