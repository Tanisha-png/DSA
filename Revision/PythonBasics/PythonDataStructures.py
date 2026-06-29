# ---------------------------------------------
# Variable assignment
# ---------------------------------------------
x = 40
print(x)

x = 509
print(x)

# ---------------------------------------------
# List - Ordered, mutable, allows duplicates
# ---------------------------------------------
myList = [1, 23, 4, "Hello", True, 12.45]
print("Original List:", myList)

# Loop through the list
print("List Elements:")
for item in myList:
    print(item)

# ---------------------------------------------
# Tuple - Ordered, immutable, allows duplicates
# ---------------------------------------------
myTuple = (23, 45, 67, "hello", True)
print("\nTuple Elements:")
for item in myTuple:
    print(item, end=" ")
print()

# ---------------------------------------------
# Set - Unordered, mutable, no duplicates
# ---------------------------------------------
mySet = {1, 2, 3, 4, 5, 6, 7, 4, 4, 4}
print("\nSet Elements:")
for item in mySet:
    print(item, end=" ")
print()

# ---------------------------------------------
# Dictionary - Key-value pairs
# ---------------------------------------------
myDictionary = {"First": 1, "Second": 2, "Third": 3}

print("\nDictionary Keys:")
for key in myDictionary:
    print(key, end=" ")

print("\nDictionary Values:")
for value in myDictionary.values():
    print(value, end=" ")

print("\nDictionary Items:")
for key, value in myDictionary.items():
    print(f"{key}: {value}", end=" ")
print()

# ---------------------------------------------
# Slicing and accessing lists
# ---------------------------------------------
thislist = ["apple", "banana", "cherry"]
print("\nLast item:", thislist[-1])

thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
print("Slicing [2:5]:", thislist[2:5])
print("Slicing [:5]:", thislist[:5])
print("Slicing [2:]:", thislist[2:])
print("Full List using [:]:", thislist[:])
print("Complete List:", thislist)

# ---------------------------------------------
# Membership check
# ---------------------------------------------
thislist = ["apple", "banana", "cherry"]
if "apples" in thislist:
    print("Yes, 'apple' is in the fruits list")
else:
    print("Not present")

# ---------------------------------------------
# Update item in list
# ---------------------------------------------
thislist = ["apple", "banana", "cherry", "orange"]
print("Before update:", thislist)
thislist[3] = "Something New"
print("After update:", thislist)

# ---------------------------------------------
# Insert & Append
# ---------------------------------------------
thislist = ["apple", "banana", "cherry"]
thislist.insert(2, "watermelon")  # Insert at index 2
print("After insert:", thislist)

thislist.append("grape")  # Add at the end
print("After append:", thislist)

# ---------------------------------------------
# Extend list with another list
# ---------------------------------------------
thislist = ["apple", "banana", "cherry"]
thislist.extend(myList)
print("After extend:", thislist)

# ---------------------------------------------
# Remove, Pop, Clear, Delete
# ---------------------------------------------
thislist = ["apple", "banana", "cherry"]
thislist.remove("banana")  # Removes by value
print("After remove:", thislist)

thislist = ["apple", "banana", "cherry"]
thislist.pop(1)  # Removes index 1
print("After pop(1):", thislist)

thislist = ["apple", "banana", "cherry"]
thislist.pop()  # Removes last item
print("After pop():", thislist)

# ---------------------------------------------
# Clear and delete list
# ---------------------------------------------
print("Original myList:", myList)
myList.clear()
print("After clear:", myList)

# Uncomment to delete the list completely
# del myList
# print(myList)  # Will cause error if uncommented
