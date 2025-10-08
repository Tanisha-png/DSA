# How do you write a function to print "Hello, World!"

'''
def greeting():
    print("Hello, World")

greeting()
'''

# Write a function that prints numbers from 1 to 5

'''
i = 1;
while i < 6:
    print(i)
    i += 1
'''

# Write a function that shows a countdown from 10 to 1

'''
i = 10;
while i > 0:
    print(i)
    i -= 1
'''

# Write a function to print even numbers from 2 to 10

'''
def even_nums(li):
    even_nums = 2;

    for i in li:
        if i % 2 == 0:
            even_nums += 1

    print(even_nums(li))
'''


# Write a function that prints the full name of a user

'''
def full_name():
    print("Tanisha Thompson")

full_name()
'''

# Write a function that return the full name of a user

'''
def full_name():
    return "Tanisha Thompson"

print(full_name())
'''

# Write a function that returns the product of three consecutive numbers

'''
def prod_nums(nums):
    return nums * (nums + 1) * (nums + 2)

print(prod_nums(6))
'''

# Write a function that returns whether element in a list is even or odd
'''
def even_odd(li):
    for i in li:
        if i % 2 == 0:
            print("even")
        else:
            print("odd")

li = [2,3,4,6,7,8,9]
even_odd(li)
'''

'''
def even_odd(li):
    result = []
    for i in li:
        if i % 2 == 0:
            result.append('even')
        else:
            result.append('odd')
    return result

li = [2,3,4,6,7,8,9]
print(even_odd(li))
'''

# Write a function which returns the sum of all the integer values in a dictionary

'''
my_dict = {'age1': 30, 'age2': 45, 'age3': 20, 'age4': 70}

def age(da):
    result = 0
    for i in da.values():
        result += i

    return result

print(age(my_dict))
'''

# Write a function that returns a list of all the numbers greater than five

'''
my_list = [7,8,9,10,13,2,4,1]

def great_5(li):
    result = []
    for i in li:
        if i > 5:
            result.append(i)
    
    return result

print(great_5(my_list))
'''