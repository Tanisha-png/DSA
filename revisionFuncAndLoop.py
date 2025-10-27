# Functions Loops 

# Loops -- for while 
#  0 - 9 , 10 excluded
# for i in range(10):
#     print(i)

# for i in range(4,10):
#     print(i)

# for i in range(1,10,1):
#     print(i)

# for i in range(1,10,2):
#     print(i)


# for i in range(10,0,-1):
#     print(i, end=" ")

# for i in range(10,0,-4):
#     print(i, end=" ")

# initialisation , condition check ,  increementation 
"""
i = 0 # initialisation
while i < 10: #condition Check 
    print(i, end=" ")
    i+=1
    #increementation 

"""
"""
for i in range(1,10):
    for j in range(1,10):
        print(i,j, end=" ")
    print()

"""

# Break Continue 
"""
for i in range(1,10):
    if i==5:
        
        break
    print(i, end=' ')
print()

for i in range(1,10):
    if i==5:
        continue
    print(i, end=' ')

"""
"""
myList = [12,34,52,63,58,79]
for i in range(len(myList)):
    print("Index:",i, end=" ")
    print(myList[i], end=" ")

print()

for i in myList:
    print(i, end=" ")    
    
"""

# Functions 

# Functions are of two types -- User defined functions , System Defined Functions 

#  How to indetify a function ---> Name()
# list() , len() , set() , dict() , int() , input() ---> System, Defined 

# User defined functions -- We write these functions 
"""
def Hello():
    print("Hello")

Hello()
Hello()
Hello()

"""
"""
def GreetUser():
    print("Hello , Tanisha!")

GreetUser()
GreetUser()
GreetUser()
GreetUser()
    
"""

"""
def GreetUser(username):
    print("Hello ,",username)

GreetUser("Tanisha")
GreetUser("Arvinder")
GreetUser("Python")
"""
"""
def Add(num1, num2):
    result = num1 + num2
    return result

x = Add(20,30)
print(x)

print(Add(100,200))
"""

"""
def Main():
    first()
    third()
    second()

def first():
    print("I am in first")

def second():
    print("I am in Second")

def third():
    print("I am in third")

Main()

"""


# Recursion -- When a function calls itself.
# Recursion is looping only but without loops.
"""
def PrintNumbers(n):
    if n >10:
        return 
    print(n)
    PrintNumbers(n+1)

PrintNumbers(1)

def PrintNumbers(2):
    if 2 >10:
        return 
    print(n)
    PrintNumbers(2+1)

PrintNumbers(2)

def PrintNumbers(3):
    if 3 >10:
        return 
    print(n)
    PrintNumbers(3+1)

PrintNumbers(3)

"""

# sum of first 10 numbers 
# result = 0
# for i in range(1,11):
#     result+=i
# print(result)

def SumNatural(n):
    result = 0
    if n >10:
        return 0
    result += n + SumNatural(n+1)
    return result 

print(SumNatural(1))


