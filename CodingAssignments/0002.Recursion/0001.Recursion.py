

#   ╔════════════════════════════════════════════╗
#   ║          RECURSION ASSIGNMENT              ║
#   ╚════════════════════════════════════════════╝

#  ┌─────────────────── Recursion ──────────────────┐

# Question 1: Calculate the factorial of a number
def factorial_loop(n):
    """Returns n! (e.g., 5! = 5 * 4 * 3 * 2 * 1)"""
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
print("Q1. Factorial of 5:", factorial_loop(5))  # Expected: 120
# TODO: Rewrite using recursion
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n-1)
print(factorial(5))

# Question 2: Sum of first n natural numbers
def sum_natural_loop(n):
    """Returns sum of numbers from 1 to n (e.g., 1 + 2 + ... + n)"""
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
print("Q2. Sum of first 5 natural numbers:", sum_natural_loop(5))  # Expected: 15
# TODO: Rewrite using recursion
def SumOfNumber(n):
    if n >5:
        return 
    
    return n + SumOfNumber(n+1)

print(SumOfNumber(1))


# Question 3: Calculate nth Fibonacci number (0-based index)
def fibonacci_loop(n):
    """Returns nth Fibonacci number (F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2))"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
print("Q3. 6th Fibonacci number:", fibonacci_loop(6))  # Expected: 8
# TODO: Rewrite using recursion

# Question 4: Power of a number (base^exponent)
def power_loop(base, exponent):
    """Returns base raised to exponent"""
    result = 1
    for _ in range(exponent):
        result *= base
    return result
print("Q4. 2^3:", power_loop(2, 3))  # Expected: 8
# TODO: Rewrite using recursion
#  2 ^3 == 2 * 2 *2 = 8

def power_loop(base , exponent):
    if exponent == 0:
        return 1
    
    return base * power_loop(base,exponent-1)

# 2 4 
print(power_loop(3,4))
# Question 5: Sum of digits in a number
def sum_digits_loop(n):
    """Returns sum of digits in n (e.g., 123 -> 1 + 2 + 3)"""
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total
print("Q5. Sum of digits in 123:", sum_digits_loop(123))  # Expected: 6

def sum_digits(n):
    if n == 0:
        return 0
    
    return n%10 + sum_digits(n//10)

print(sum_digits(12345))

# / -- Division Operator

# % -- Modulus Operator

# 1234 -- count number of digits 

# Convert the number into String and use len()
# print(1234//10)
# print(1234%10)

def SumOfDigit(n):
    if n == 0:
        return 1
    count += 1
    return SumOfDigit(n//10)
    # return n % 10 + SumOfDigit(n//10)
print(SumOfDigit(1234))



# Question 6: Count digits in a number
def count_digits_loop(n):
    """Returns number of digits in n"""
    count = 0
    while n > 0:
        count += 1
        n //= 10
    return count
print("Q6. Number of digits in 12345:", count_digits_loop(12345))  # Expected: 5
# TODO: Rewrite using recursion

# Question 7: Reverse a string
def reverse_string_loop(s):
    """Returns reversed string"""
    result = ""
    for char in s:
        result = char + result
    return result
print("Q7. Reverse of 'hello':", reverse_string_loop("hello"))  # Expected: olleh
# TODO: Rewrite using recursion

# Question 8: Check if a string is palindrome
def is_palindrome_loop(s):
    """Returns True if s is a palindrome, False otherwise"""
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
print("Q8. Is 'racecar' a palindrome?:", is_palindrome_loop("racecar"))  # Expected: True
# TODO: Rewrite using recursion

# Question 9: Sum of elements in a list
def sum_list_loop(lst):
    """Returns sum of all elements in lst"""
    total = 0
    for num in lst:
        total += num
    return total
print("Q9. Sum of [1, 2, 3, 4]:", sum_list_loop([1, 2, 3, 4]))  # Expected: 10
# TODO: Rewrite using recursion
def sumElem(nums):
    if len(nums)==0:
        return 0
    return nums[0] + sumElem(nums[1:])
    
nums = [1,3,5,6,2,7,4]
print(sumElem(nums))
# Question 10: Find maximum in a list
def max_list_loop(lst):
    """Returns maximum element in lst"""
    max_val = lst[0]
    for num in lst:
        if num > max_val:
            max_val = num
    return max_val
print("Q10. Maximum in [4, 2, 7, 1]:", max_list_loop([4, 2, 7, 1]))  # Expected: 7
# TODO: Rewrite using recursion

# Question 11: Count occurrences of an element in a list
def count_element_loop(lst, x):
    """Returns number of times x appears in lst"""
    count = 0
    for num in lst:
        if num == x:
            count += 1
    return count
print("Q11. Count of 2 in [1, 2, 2, 3]:", count_element_loop([1, 2, 2, 3], 2))  # Expected: 2
# TODO: Rewrite using recursion

# Question 12: Calculate GCD of two numbers
def gcd_loop(a, b):
    """Returns greatest common divisor of a and b"""
    while b:
        a, b = b, a % b
    return a
print("Q12. GCD of 48 and 18:", gcd_loop(48, 18))  # Expected: 6
# TODO: Rewrite using recursion

# Question 13: Convert decimal to binary
def decimal_to_binary_loop(n):
    """Returns binary representation of n as a string"""
    binary = ""
    while n > 0:
        binary = str(n % 2) + binary
        n //= 2
    return binary if binary else "0"
print("Q13. Binary of 13:", decimal_to_binary_loop(13))  # Expected: 1101
# TODO: Rewrite using recursion

# Question 14: Check if a number is prime
def is_prime_loop(n):
    """Returns True if n is prime, False otherwise"""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True
print("Q14. Is 17 prime?:", is_prime_loop(17))  # Expected: True
# TODO: Rewrite using recursion

# Question 15: Sum of even numbers up to n
def sum_even_loop(n):
    """Returns sum of even numbers from 2 to n"""
    total = 0
    for i in range(2, n + 1, 2):
        total += i
    return total
print("Q15. Sum of even numbers up to 10:", sum_even_loop(10))  # Expected: 30
# TODO: Rewrite using recursion

# Question 16: Length of a string
def string_length_loop(s):
    """Returns length of string s"""
    count = 0
    for _ in s:
        count += 1
    return count
print("Q16. Length of 'python':", string_length_loop("python"))  # Expected: 6
# TODO: Rewrite using recursion

# Question 17: Product of elements in a list
def product_list_loop(lst):
    """Returns product of all elements in lst"""
    result = 1
    for num in lst:
        result *= num
    return result
print("Q17. Product of [2, 3, 4]:", product_list_loop([2, 3, 4]))  # Expected: 24
# TODO: Rewrite using recursion

# Question 18: Check if a number is a power of 2
def is_power_of_two_loop(n):
    """Returns True if n is a power of 2, False otherwise"""
    if n <= 0:
        return False
    while n > 1:
        if n % 2 != 0:
            return False
        n //= 2
    return True
print("Q18. Is 16 a power of 2?:", is_power_of_two_loop(16))  # Expected: True
# TODO: Rewrite using recursion

# Question 19: Sum of squares of first n natural numbers
def sum_squares_loop(n):
    """Returns sum of squares from 1 to n (e.g., 1^2 + 2^2 + ... + n^2)"""
    total = 0
    for i in range(1, n + 1):
        total += i * i
    return total
print("Q19. Sum of squares up to 4:", sum_squares_loop(4))  # Expected: 30
# TODO: Rewrite using recursion

# Question 20: Generate a string of n stars
def star_string_loop(n):
    """Returns a string with n stars (*)"""
    result = ""
    for _ in range(n):
        result += "*"
    return result
print("Q20. String of 5 stars:", star_string_loop(5))  # Expected: *****
# TODO: Rewrite using recursion