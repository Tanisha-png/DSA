# Functions -- A block of code 

# Task : Print the user name 
# print("Hello Tanisha")
# print("Hello Tanisha")
# print("Hello Tanisha")
# print("Hello Tanisha")
# print("Hello Tanisha")

# def PrintName():
#     print("Hello Tanisha")

# PrintName()
# PrintName()
# PrintName()
# PrintName()
# PrintName()
# PrintName()


# Types of functions --System Defined Function -- len(), input(),print(),int()
# User Defined Functions -- def 

# 
"""
def AddNumbers(a,b):
    print(a+b)

AddNumbers(10,20)
AddNumbers(100,20)
"""

"""
def Username(name):
    print("Hello", name)

Username("Tanisha")
Username("Python")
Username("Course")
"""


# Write a function that accepts three numbers and print the product of the numbers.

"""
def prod3Num(a,b,c):
    print(a*b*c)

prod3Num(10,20,3)
"""


# Write a function that find the sum of even numbers between 20 and 43.
"""
def SumEvenNum(a,b):
    sum = 0
    i= 20
    while i < 44:
        if i%2==0:
            sum+=i 
        i+=1
    print(sum)

SumEvenNum(20,43)

"""



# Write a function (calculator) which takes three arguments (two numbers and operator) and then print the result based on the operator.


"""
def calculator(num1, num2 , op):
    if op == "+":
        print(num1+ num2)
    elif op =="-":
        print(num1 - num2)
    elif op =="*":
        print(num1*num2)
    elif op=="/":
        print(num1/num2)
    elif op=="%":
        print(num1%num2)
    elif op=="//":
        print(num1//num2)
    else:
        print("Invalid Input")


calculator(100,10,"/")
calculator(100,10,"-") 
"""  


# Write a program that prints the English representation of the number entered from Keyboard (0-9). 

# 1 --> "One"

"""
def EnglishWord(key):
    if key ==0:
        print("Zero")
    elif key ==1:
        print("One")
    elif key ==2:
        print("Two")
    elif key ==3:
        print("Three")
    elif key ==4:
        print("Four")
    elif key ==5:
        print("Five")
    elif key ==6:
        print("Six")
    elif key ==7:
        print("Seven")
    elif key ==8:
        print("Eight")
    elif key ==9:
        print("NIne")
    else:
        print("Invalid Number")
    
EnglishWord(6)
"""


# Write a function tha prints the table of 5.
"""
def tableOfFive():
    for i in range(1,51):
        if i%5==0:
            print(i)

tableOfFive()
"""



