# Functions -- block of code written to solve one specific task

# () -- print() , len() , copy() , items() , values() -- System Defined / langauge Defined 

# User Defined functions -- def (keyword)

def Hello():
    print("Hello World!")

# Calling a function by using the name
# Hello()

# 

def GreetUser():
    print("Hello User")

# GreetUser()
# GreetUser()
# GreetUser()
# GreetUser()

# Functions can take parameters

# def GreetUser2(fname , lname):
#     print("Welcome to the cafe : ", fname + " " + lname)

# GreetUser2("Arvinder","Tutor")

# GreetUser2("Suman","Tutor")


# def AddNumbers(num1, num2):
#     result  = 0 
#     result = num1 + num2
#     print("The Addition of ", num1 ," and ", num2 , " is :", result)


# AddNumbers(23,34)
# AddNumbers(123,344)

# Function can return something also

#  return -- 1. returns a copy of the local variable , 2. Marks the ending of the program 
def AddNumbers(num1, num2):
    result  = 0 
    result = num1 + num2
    print("The Addition of ", num1 ," and ", num2 , " is :", result)
    return result
    # print("After the return")
    # print("The Addition of ", num1 ," and ", num2 , " is :", result)

# print(result)
# x = 50 
# x = AddNumbers(23,34)
# print(x + 1000)

# print(AddNumbers(123,344))

# Scope (variable Scope -- Block , Local/ Functional , Global)

# {} -- Block -- Specifc to Javascript

# Local / Functional Scope -- 



