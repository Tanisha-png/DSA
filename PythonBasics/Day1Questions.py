# Write a program to find the Area of rectangle by getting the length and breath from user

'''
length = int(input("Enter the length of the rectangle: "))
width = int(input("Enter the width of the rectangle: "))
area = (length * width)

print(area)

'''

# Permiter of rectangle 
''' 
perimeter = 2 * (length + width)
print(perimeter)

'''


# Square Area , Perimeter 
'''
side = int(input("Enter the length of the side of a square: "))
perimeter = 4 * side
area = side ** 2

print(perimeter)
print(area)

'''


# Circle , Circumference 
'''
radius = float(input("Enter the radius of the circle: "))
circumference = 2 * 3.14 * radius
print(circumference)

'''

# WAP to calculate the simple interest for a given amount , time and rate of interst
'''
principal = float(input("Enter the principal amount: "))
rate = float(input("Enter the rate of interest (per year in %): "))
time = float(input("Enter the time (in years): "))

interest = (principal * rate * time) / 100

print(interest)

'''
# Convert the Fahrenhiet into Degree scale  (Kelvin)
'''

fahrenheit = int(input("Enter the temperature in Fahrenheit: "))
celsius = (5/9) * (fahrenheit - 32)

print(celsius)

'''

# Print the full name of a person by taking firstname and lastname as input
'''
first_name = input("Enter your first name: ")
last_name = input("Enter your lastname: ")
full_name = first_name + " " + last_name
print(full_name)

'''



# print("-------- Cartoon Character -------")

'''
print("""
Select one option:
    1. Bugs Bunny
    2. Daffy Duck
    3. Porky Pig
    4. Foghorn Leghorn
    5. Sylvester the Cat
    6. Tweety Bird
    7. Speedy Gonzales
    8. Road Runner
""")

choice = input("Enter looney tune character: ")

if choice == "1":
    print("Eh, what's up, doc")
elif choice == "2":
    print("You're despicable!")
elif choice == "3":
    print("Th-th-th-that's all folks!")
elif choice == "4":
    print("That’s a joke, son!")
elif choice == "5":
    print("Sufferin' succotash!")
elif choice == "6":
    print("I tawt I taw a puddy tat!")
elif choice == "7":
    print("¡Ándale! ¡Ándale! ¡Arriba! ¡Arriba!")
elif choice == "8":
    print("Beep beep!")
else:
    print("Invalid choice")
'''

# Lists
'''
my_list = ["fries", "onion rings", "wings"]
print(my_list)
'''

'''
my_list = ["fries", "onion rings", "wings"]
print(len(my_list))
'''

'''
fav_athletes = ["Paige", "Angel", "Aja"]
print(fav_athletes[1])
'''

'''
this_list = ["apple", "banana", "cherry", "orange", "mango", "melon"]
print(this_list[1:5])
'''

'''
this_list = ["banana", "apple", "cherry", "orange", "kiwi", "mango"]
print(this_list[:3])
'''

'''
this_list = ["banana", "apple", "cherry", "orange", "kiwi", "mango"]
print(this_list[3:])
'''

'''
my_friends = ["Reggie", "Rena", "Marlene", "Tyrone", "Andrea", "Flip", "Meg"]
if "Marlene" in my_friends:
    print("Yes, she is my friend from high school.")
'''

'''
fav_people = ["Rena", "Reggie", "Tyrone", "Marlene", "Andrea", "Bob"]
if "Reggie" in fav_people:
    print("Yes, Reggie is my wonderful husband.")
'''

# Sets

'''
this_set = {"cardio", "weights", "rest"}
print(this_set)
'''

'''
this_set = {"cardio", "weights", "rest"}
print(len(this_set))
'''

'''
set_1 = {"cardio", "weights", "calisthenics"}
set_2 = {1, 5, 7, 9, 2}
set_3 = {True, False, True}

print(set_1)
print(set_2)
print(set_3)
'''

'''
fav_singers = {"Michael Jackson", "Aaliyah", "Whitney Houston", "Madonna", "Mariah Carey"}
print(type(fav_singers))
'''

'''
fav_fruits = {"apples", "strawberries", "cherries", "pears", "oranges"}
for x in fav_fruits:
    print(x)
'''

'''
fav_fruits = {"apples", "strawberries", "cherries", "pears", "oranges"}
print("apples" in fav_fruits)
'''

'''
fav_fruits = {"apples", "strawberries", "cherries", "pears", "oranges"}
print("mangos" not in fav_fruits)
'''

# Tuples
'''
my_tuple = ("apple", "banana", "cherry")
print(my_tuple)
'''

'''
my_tuple = ("cherry", "kiwi", "oranges", "mangos", "cherry", "melons")
print(my_tuple)
'''

'''
my_tuple = ("grapes", "mangos", "strawberries")
print(len(my_tuple))
'''

'''
my_tuple = ("grapes", "mangos", "strawberries")
print(type(my_tuple))
'''

# Dictionaries

'''
this_dict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}

print(this_dict)
'''

'''
this_dict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 2025,
}

print(this_dict["brand"])
'''

'''
this_dict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 2026,
    "year": 1964
}

print(this_dict)
'''

'''
this_dict = {
    "brand": "Toyota",
    "model": "Camry",
    "year": 2025
}

print(len(this_dict))
'''

# While Loops

'''
i = 1
while i < 6:
    print(i)
    i += 1
'''

'''
i = 1 
while i < 6:
    print(i)
    if i == 3:
        break
    i += 1
'''

'''
i = 0
while i < 6:
    i += 1
    if i == 3:
        continue
    print(i)
'''

'''
i = 1
while i < 6:
    print(i)
    i += 1
else:
    print("i is no longer less than 6")
'''

# For Loops

'''
fruits = ["apples", "banana", "cherry"]
for x in fruits:
    print(x)
'''

'''
for x in "bananas":
    print(x)
'''

'''
fruits = ["apples", "cherries", "grapes"]
for x in fruits:
    print(x)
    if x == "cherries":
        break
'''

'''
fruits = ["kiwi", "melon", "strawberry"]
for x in fruits:
    if x == "strawberry":
        break
    print(x)
'''

'''
veggies = ["carrot", "celery", "spinach"]
for x in veggies:
    if x == "carrot":
        continue
    print(x)
'''

'''
for x in range(9):
    print(x)
'''

'''
for x in range(2, 8):
    print(x)
'''

'''
for x in range(2, 40, 2):
    print(x)
'''

'''
for x in range(6):
    print(x)
else:
    print("Finally finished!")
'''

'''
for x in range(6):
    if x == 3: break
    print(x)
else:
    print("Finally finished!")
'''

'''
adj = ["red", "big", "tasty"]
fruits = ["apple", "cherry", "kiwi"]

for x in adj:
    for y in fruits:
        print(x, y)
'''

# If Else

'''
a = 33
b = 200

if b > a:
    print("b is greater than a")
'''

'''
a = 33
b = 33

if b > a:
    print("b is greater than a")
elif a == b:
    print("a and b are equal")
'''

'''
a = 200
b = 33

if b > a:
    print("b is greater than a")
elif a == b:
    print("a and b are equal")
else:
    print("a is greater than b")
'''

'''
a = 100
b = 50

if a > b: print("a is greater than b")
'''

'''
a = 4
b = 21

print("A") if a > b else print("B")
'''

'''
a = 330
b = 330

print("A") if a > b else print("=") if a == b else print("B")
'''


'''
a = 200
b = 33
c = 500

if a > b and c > a:
    print("Both conditions are True")
'''

'''
a = 200
b = 33
c = 500

if a > b or a > c:
    print("At least one of the conditions is True")
'''

'''
a = 33
b = 200

if not a > b:
    print("a is NOT greater than b")
'''


'''
x = 41

if x > 10:
    print("Above ten,")
    if x > 20:
        print("and also above 20!")
    else:
        print("but not above 20.")
'''

