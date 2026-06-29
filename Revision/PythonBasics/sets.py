# Python Set Tutorial
# This script demonstrates the essential operations and features of Python sets.

# 1. Creating a Set
# Sets are unordered collections of unique, immutable elements.
print("1. Creating a Set")
myset = {"apple", "banana", "cherry"}
print("Basic set:", myset)

# Creating an empty set (use set(), not {})
empty_set = set()
print("Empty set:", empty_set)

# Sets automatically remove duplicates
myset2 = {1, 2, 3, 4, 5, 2, 1, 3, 2, 6}
print("Set with duplicates removed:", myset2)

# Note: True, 1, 1.0, 1.000 are considered the same in sets
myset3 = {1, True, 1.0, 1.0000}
print("Set with True, 1, 1.0, 1.0000:", myset3)

# Note: False, 0, 0.0 are considered the same in sets
myset4 = {False, 0, 0.0}
print("Set with False, 0, 0.0:", myset4)

# 2. Adding Elements to a Set
# Sets are mutable; you can add new elements but cannot change existing ones.
print("\n2. Adding Elements to a Set")
myset2 = {1, 2, 3, 4, 5}
myset2.add(100)
myset2.add(-110)
print("After adding 100 and -110:", myset2)

# Using update() to add multiple elements from another iterable
thisset = {"apple", "banana", "cherry"}
tropical = {"pineapple", "mango", "papaya"}
thisset.update(tropical)
print("After updating thisset with tropical:", thisset)

# 3. Removing Elements from a Set
# Use remove(), discard(), pop(), clear(), or del.
print("\n3. Removing Elements from a Set")
thisset = {"apple", "banana", "cherry", "pineapple"}

# a. remove() - Removes an element; raises KeyError if not present
thisset.remove("apple")
print("After remove('apple'):", thisset)
# thisset.remove("apples")  # Would raise KeyError

# b. discard() - Removes an element; does not raise an error if not present
thisset.discard("banana")
thisset.discard("apples")  # No error
print("After discard('banana') and discard('apples'):", thisset)

# c. pop() - Removes and returns a random element (sets are unordered)
tropical = {"pineapple", "mango", "papaya"}
popped_item = tropical.pop()
print("Popped item:", popped_item)
print("After pop():", tropical)

# d. clear() - Removes all elements
thisset.clear()
print("After clear():", thisset)

# e. del - Deletes the entire set
thisset = {"apple", "banana", "cherry"}
del thisset
# print(thisset)  # Would raise NameError

# 4. Set Operations
# Sets support mathematical operations like union, intersection, difference, etc.
print("\n4. Set Operations")
set1 = {12, 23, 45, 67, 34, 20}
set2 = {31, 12, 45, 76, 98, 80}

# a. Union - Combines all elements from both sets (no duplicates)
print("Union using union():", set1.union(set2))
print("Union using |:", set1 | set2)

# b. Intersection - Returns common elements between sets
print("Intersection using intersection():", set1.intersection(set2))
print("Intersection using &:", set1 & set2)

# c. Difference - Returns elements in set1 but not in set2
print("Difference using difference():", set1.difference(set2))
print("Difference using -:", set1 - set2)

# d. Symmetric Difference - Returns elements in either set, but not both
print("Symmetric difference using symmetric_difference():", set1.symmetric_difference(set2))
print("Symmetric difference using ^:", set1 ^ set2)

# e. Disjoint Sets - Checks if two sets have no common elements
print("Are set1 and set2 disjoint?:", set1.isdisjoint(set2))
set3 = {111, 222, 333, 444}
print("Are set1 and set3 disjoint?:", set1.isdisjoint(set3))

# 5. Additional Set Features
print("\n5. Additional Set Features")
# a. Checking if an Element Exists
set1 = {12, 23, 45, 67, 34, 20}
if 12 in set1:
    print("12 exists in set1!")

# b. Getting Set Length
print("Length of set1:", len(set1))

# c. Subset and Superset
set4 = {12, 45}
print("Is set4 a subset of set1?:", set4.issubset(set1))
print("Is set1 a superset of set4?:", set1.issuperset(set4))

# d. Looping Through a Set
print("Looping through set1:")
for item in set1:
    print(item)

# 6. Set Comprehension
# Create sets using comprehension for concise code.
print("\n6. Set Comprehension")
squares = {x*x for x in range(1, 4)}
print("Set comprehension (squares):", squares)

# 7. Notes on Sets
# - Sets are unordered, so the order of elements is not guaranteed.
# - Sets only store unique elements; duplicates are automatically removed.
# - Elements must be immutable (e.g., strings, numbers, tuples).
# - True/1/1.0 and False/0/0.0 are treated as identical in sets.

# Example of duplicate values being removed
myset5 = {1, True, 1.0, "apple", "apple", False, 0}
print("Set with mixed duplicates:", myset5)