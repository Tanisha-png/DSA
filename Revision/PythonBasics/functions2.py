# Call Stack

# def Third():
#     print("Third")

# def Second():
#     Third()
#     print("Second")


# def First():
#     print("First")
#     Second()


# First()

# Recursion -- A function calls itself.

# There are two ways to write code -- iterative (Loops)  and Recursive (Functions)
# i =1
# while i <= 5:
#     print(i,  end=" ")
#     i+=1


# Recursion 
# print()
# def PrintNumber(n):
#     # base condition 
#     if n >=6:
#         return
#     print(n , end=" ")
#     PrintNumber(n+1)

# PrintNumber(1)

# 1 + 2 + 3 + 4 +5 +  . . . . .+ 10 



# Sum of 1-10 numbers

# i = 1
# total = 0
# while i <=10:
#     total+=i
#     i+=1

# print(total)


# 
"""
def SumOfNumbers(n):
    total = 0
    if n >=10:
        return n
    total+= n + SumOfNumbers(n+1)
    return total

print(SumOfNumbers(1))

"""

# Recursion 

# base condition 
# call to the same function 

# def PrintNum(n):
#     if n >=10:
#         return 
#     print(n)
#     PrintNum(n+1)

# PrintNum(0)


# def PrintNum(n):
#     if n < 0:
#         return 
#     print(n)
#     PrintNum(n-1)

# PrintNum(9)

# 8 <- 9 -> 10

# 5! = 5*4*3*2*1 = 120
# def Factorial(n):
#     if n==1 or n==0:
#         return 1 
    
#     return n*Factorial(n-1)

# print(Factorial(5))


# 