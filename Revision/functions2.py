# def Name():

# def PrintName():
#     print("Hello Tanisha")
# PrintName()

# def Add():
#     x = 40 
#     y = 50 
#     print(x+y)
# Add()

# def Add(x,y):
#     print("Result is :" , x+y)

# Add(40,50)
# Add(30,20)


"""
def Add(x,y):
    result = x+y 
    return result

print(Add(40,50))
x = Add(300,400)
print(x+100)
"""
# print(result)


# Write a functions that  takes three numbers and returns the average.
"""
def Average(a,b,c):
    return (a+b+c)/3

print(Average(10,20,30))
"""


# Write a function that takes firstname and lastname of the user and prints the fullname.

"""
def FullName(fname , lname):
    print(fname + " "+lname)

FullName("Arvinder","Pal")
"""


# Write a function which takes a list as an input and returns the largest number from the list.
"""
def MaxNum(li):
    max = float('-inf')
    for i in li:
        if i > max:
            max = i 
    
    return max

l = [23,12,124,26,78,56,99,20]
print(MaxNum(l))

"""
# l = [23,12,124,26,78,56,99,20]
# for i in range(len(l)):
#     print(i, end=" ")
# print()
# for i in l:
#     print(i , end=" ")



# Write a function that takes the list as input and return the minimum number (Smallest number).

"""
def minNum(li):
    min = float('inf')

    for i in li:
        if i < min:
            min = i 
    
    return min

l = [23,12,124,26,78,56,99,20]
print(minNum(l))
"""


# Write a function that takes the list as input and returns the sum of all the elements of the list.
"""
def SumList(li):
    result = 0

    for i in li:
        result+=i    #result  = result + i
    
    return result 

l = [23,12,124,26,78,56,99,20]
print(SumList(l))

"""

# Find the sum of elements divided by three.

"""
def SumList(li):
    result = 0

    for i in li:
        if i%3==0:
            result+=i    #result  = result + i
    
    return result 

l = [23,12,124,26,78,56,99,20]
print(SumList(l))
"""
# Write a function that Returns the count of even numbers in a list
"""
def EvenNum(li):
    count = 0
    for i in li:
        if i%2==0:
            count+=1
    return count

l = [23,12,124,26,78,56,99,20]
print(EvenNum(l))
"""
# Write a function that Returns the sum of even numbers in a list

"""
def EvenNum(li):
    result = 0

    for i in li:
        if i%2==0:
            result+=i 
    return result 

l = [23,12,124,26,78,56,99,20]
print(EvenNum(l))

"""

# Write a function that returns the difference between the sum of odd and even numbers in a list.

"""
def DiffEvenOdd(li):
    oddSum = 0
    evenSum = 0

    for i in li:
        if i%2==0:
            evenSum +=i 
        else:
            oddSum+=i 
    
    return oddSum - evenSum

l = [23,12,124,26,78,56,99,20]
print(DiffEvenOdd(l))
"""

# Write a program which returns the difference of the product and sum of numbers in a list.

"""
def DiffProdSum(li):
    prod = 1
    result = 0

    for i in li:
        result+=i
        prod*=i 
    
    return prod - result 

l = [23,12,124,26,78,56,99,20]
# l = [1,2,3,4,5]
print(DiffProdSum(l))
"""

# Write a program (function) that returns the index of a number if it is present in the list -1 if not.


# Linear Search Algorithm -- O(N)
"""
def SearchElem(li,target):
    for i in range(len(li)):
        if li[i]==target:
            return i 
    
    return -1

l = [23,12,124,26,78,56,99,20]
# l = [1,2,3,4,5]
print(SearchElem(l,126))

"""

# Write a function that accepts three values (num1, num2 , operator) and performs the operation based on the operator passed and returns the result to the user.

"""
def Calculator(num1, num2,op):
    if op =="+":
        return num1+ num2 
    elif op =="-":
        return num1- num2 
    elif op =="*":
        return num1* num2
    elif op =="/":
        return num1 / num2
    elif op =="//":
        return num1//num2
    elif op =="%":
        return num1%num2
    else:
        return "Invlaid Operations"

print(Calculator(135,126,"+."))
"""




    









    






















































