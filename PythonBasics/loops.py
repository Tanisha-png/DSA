
# Loops -- For while 

# Iteration -- Iterative -- Loops 

# while -- 

# print("Hello Python")
# print("Hello")
# print("Hello")
# print("Hello")
# print("Hello")


# starting point -- Initialisation -- generally 0

# condition check -- if the condition is true we will run the loop , otherwise we will stop it.

# step -- Increement / Decreement 

# i = 5
# while i <10:
#     print(i)
#     i+=2


# Print all the even numbers less than 20 

# i = 0
# while i<20:
#     print(i, end=" ")
#     i+=2


# for -- 
# range -- start , end , step 
# for i in range(0,20,2):
#     print(i, end=" ")


# myList = [11,28,33,40,56,51,6,7]

# for i in range(len(myList)):
#     print(myList[i] , end=" ")

# for i in myList:
#     print(i, end=" ")


# Print all the multiples of 5 till 100.
# i=0
# while i<100:
#     print(i, end=" ")
#     i+=5 


# Every user has three lives. --- for loop 


# Do you want to continue ?  Yes No 


# print("Do you want to continue ?")
# Choice = "Y"
# while Choice=="N":
#     print("Let's play the game.")

# if Choice=="Y":
#     print("Thanks for playing the game")


# Break Continue 

# for i in range(10):
#     if i==5:
#         break 
#     print(i, end=" ")

# print()
# for i in range(10):
#     if i==5:
#         continue 
#     print(i, end=" ")


# if else for while -- W3schools 


myList = [2,3,56,78,90,12,31,43]

# Find the sum of all elements of the list
# result = 0
# for i in myList:
#     result+=i 

# print(result)


# Product of all the elements 
# prod = 1

# for i in myList:
#     prod*= i

# print(prod)


# Find the product of even numbers only.
# prod = 1

# for i in myList:
#     if i%2==0:
#         prod*=i

# print(prod)


# Find the count of numbers greater than 50.

# count =0 
# for i in myList:
#     if i>50:
#         count+=1

# print(count)



# Square every element of the list

# for i in range(len(myList)):
#     myList[i] = myList[i]**2

# print(myList)

# return all the even elements from the list
myList = [2,3,56,78,90,12,31,43]
newList =[]
for i in myList:
    if i%2==0:
        newList.append(i)
print(newList)

# Sets , Dictionary , Lists , Tuples -- Create , Add , Iterate , update , Delete , clear , copy 


    