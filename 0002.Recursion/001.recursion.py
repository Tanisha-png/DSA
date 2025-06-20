# ╔════════════════════════════════════════════════════╗
# ║          Python Functions: Theory & Examples        ║
# ╚════════════════════════════════════════════════════╝
#
# A function is a reusable block of code for a specific task.
# Functions improve modularity, readability, and reusability.
# Python supports:
# 1. Built-in Functions (e.g., print(), len()): Ready-to-use.
# 2. User-Defined Functions: Created with 'def' keyword.
#
# Topics Covered:
# - Functions with/without returns and parameters
# - Functions calling other functions
# - Recursion with base conditions

# ╔════ Functions: No Return, No Parameters ════╗
# Executes code but doesn't return a value or accept input.
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!

# ╔════ Functions: No Return, With Parameters ════╗
# Accepts parameters but doesn't return a value.
def greet_user(name):
    print(f"Hello, {name}!")

# Call with a parameter
greet_user("Arvinder")  # Output: Hello, Arvinder!

# ╔════ Functions: With Return, No Parameters ════╗
# Returns a value but doesn't accept parameters.
def get_greeting():
    return "Hello, World!"

# Store and print the returned value
message = get_greeting()
print(message)  # Output: Hello, World!

# ╔════ Functions: With Return, With Parameters ════╗
# Accepts parameters and returns a value.
def add_numbers(a, b):
    return a + b

# Store and print the result
result = add_numbers(3, 4)
print(result)  # Output: 7

# ╔════ Functions Calling Other Functions ════╗
# Functions can call other functions to modularize tasks.
def hello():
    print("I am in Hello Function")  # Step 3

def greet_user_advanced():
    print("Hello User")  # Step 2
    hello()  # Calls hello()
    print("After Hello")  # Step 4

# Example execution
print("Starting")  # Step 1
greet_user_advanced()
print("After Greet")  # Step 5

# Another example of function calls
def first():
    print("Inside First")
    third()

def third():
    second()
    print("Inside Third")

def second():
    print("Inside Second")

# Call the chain
first()

# ╔════ Recursion ════╗
# Recursion: A function calls itself.
# Must have:
# - Base Condition: Stops recursion to prevent infinite loops.
# - Recursive Case: Calls the function with modified input.

# Example 1: Controlled Recursion with Base Condition
def number(n):
    if n <= 0:  # Base condition
        return
    number(n-1)  # Recursive call
    print(n)  # Prints 1 to n

# Call with n=5 for brevity
number(5)

# Example 2: Factorial Using Recursion
# Computes n! (e.g., 5! = 5 * 4 * 3 * 2 * 1 = 120)
def factorial(n):
    if n == 0 or n == 1:  # Base condition
        return 1
    return n * factorial(n-1)  # Recursive case

# Compute factorial of 5
print(factorial(5))  # Output: 120

