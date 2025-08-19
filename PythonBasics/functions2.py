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
def SumOfNumbers(n):
    total = 0
    if n >=10:
        return n
    total+= n + SumOfNumbers(n+1)
    return total

print(SumOfNumbers(1))