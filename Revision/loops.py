# Loops -- Iteration -- Repeation 

# for , while , infinite loop

# 1,2,3,4,5 --> task is to go from 1 to 5

# intialisation -- Starting point --> 1 
# condition --> 5 
# increement -- Move -->  1 step at a time

# i =1 # starting point
# while i < 6: #Condition Check
#     print("Reached :",i)
#     i+=1 #Increement


# For Loop -- range(starting, ending,increement(Step))
# for i in range(1,6,1):
#     print("Reached",i)

# infinite Loops -- 
# while True:
#     print("Hello")

# i =1 # starting point
# while "Hello": #Condition Check
#     print("Reached :",i)
#     i+=1 #Increement



# Print the 2's table 
"""
i = 1 
while i <11:
    print(2*i)
    i+=1
"""

"""
for i in range(1,11):
    print(2*i)
"""

"""
for i in range(2,21,2):
    print(i)
"""


# Print the numbers from 10 - 1

"""
i = 10
while i >0:
    print(i)
    i-=1
"""

# For loop 
"""
for i in range(10,0,-1):
    print(i)
"""


# Find the sum of first 10 multiples of 3.  3, 6, 9,... ,30 

# i =1 
# sum = 0
# while i <11:
#     sum += 3*i 
#     i+=1

# print(sum)

# i =3
# sum = 0
# while i <31:
#     sum += i 
#     i+=3

# print(sum)

# For loop 
# sum = 0 
# for i in range(3,31,3):
#     sum +=i

# print(sum)

# sum = 0 
# for i in range(1,11):
#     sum+=3*i 

# print(sum)


# Find the sum of all the numbers from 1-20
# While 

"""
i =1
sum = 0 
while i < 21:
    sum +=i
    i+=1

print(sum)
"""

# For loop
"""
sum = 0
for i in range(1,21):
    sum+=i

print(sum)
"""



# Find the product of odd number between 15 - 41

# While 

"""
prod = 1
i = 15 
while i < 42:
    if i%2!=0:
        prod*=i
    i+=1

print(prod)
"""


# For 

"""
prod = 1
for i in range(15,42,2):
    prod*= i

print(prod)
"""

# prod = 1
# for i in range(15,42):
#     if i %2!=0:
#         prod*= i

# print(prod)


# Find the sum of all the multiples of 6 between 16 and 40.

"""
sum = 0
i = 16 
while i < 41:
    if i%6==0:
        sum+=i 
    i+=1
print(sum)
"""
"""
sum = 0 
for i in range(16,41):
    if i%6==0:
        sum+=i 

print(sum)
"""




