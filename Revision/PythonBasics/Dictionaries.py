# Python Dictionary Tutorial
# This script demonstrates the essential operations and features of Python dictionaries.

# 1. Creating a Dictionary
# A dictionary is a collection of key-value pairs, where keys must be unique and immutable.
print("1. Creating a Dictionary")
thisdict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}
print(thisdict)

# 2. Accessing Dictionary Elements
# Access values using keys, either directly or via the get() method.
print("\n2. Accessing Dictionary Elements")
# a. Using Square Brackets
print("Using square brackets:", thisdict['brand'])
# b. Using get() Method
print("Using get():", thisdict.get('model'))
print("Using get() with default:", thisdict.get('color', 'Not Found'))

# 3. Viewing Keys, Values, and Items
# Methods to view keys, values, or both as key-value pairs.
print("\n3. Viewing Keys, Values, and Items")
# a. keys() - View All Keys
print("Keys:", thisdict.keys())
# b. values() - View All Values
print("Values:", thisdict.values())
# c. items() - View Keys and Values as Tuples
print("Items:", thisdict.items())

# 4. Updating Dictionary Elements
# Modify existing key-value pairs using square brackets or update().
print("\n4. Updating Dictionary Elements")
# a. Using Square Brackets
thisdict['brand'] = 'Toyota'
print("After updating brand:", thisdict)
# b. Using update() Method
thisdict.update({'year': 2020, 'model': 'Camry'})
print("After update() method:", thisdict)

# 5. Adding New Key-Value Pairs
# Add new key-value pairs using square brackets or update().
print("\n5. Adding New Key-Value Pairs")
# a. Using Square Brackets
thisdict['owner'] = 'Self'
print("After adding owner:", thisdict)
# b. Using update() Method
thisdict.update({'color': 'Blue'})
print("After adding color:", thisdict)

# 6. Removing Items from a Dictionary
# Remove items using pop(), popitem(), del, or clear().
print("\n6. Removing Items from a Dictionary")
# a. pop() - Remove a Specific Key
thisdict.pop('color')
print("After pop('color'):", thisdict)
# b. popitem() - Remove the Last Added Item
thisdict.popitem()
print("After popitem():", thisdict)
# c. del - Delete a Specific Key
del thisdict['model']
print("After del['model']:", thisdict)
# d. clear() - Remove All Items
thisdict = {'brand': 'Toyota', 'year': 2020}  # Reset dictionary
thisdict.clear()
print("After clear():", thisdict)

# 7. Copying a Dictionary
# Create a copy to avoid modifying the original dictionary.
print("\n7. Copying a Dictionary")
thisdict = {'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
# a. Using copy() Method
newdict = thisdict.copy()
newdict['brand'] = 'Honda'
print("Original after copy():", thisdict)
print("Copy after modification:", newdict)
# b. Using dict() Constructor
newdict = dict(thisdict)
newdict['year'] = 2025
print("Original after dict():", thisdict)
print("Copy after modification:", newdict)

# 8. Additional Dictionary Features
print("\n8. Additional Dictionary Features")
# a. Checking if a Key Exists
thisdict = {'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
if 'brand' in thisdict:
    print("Brand key exists!")
# b. Getting Dictionary Length
print("Dictionary length:", len(thisdict))
# c. Nested Dictionaries
thisdict['details'] = {'color': 'Red', 'mileage': 50000}
print("Nested dictionary:", thisdict)
# d. Looping Through a Dictionary
print("Looping through keys:")
for key in thisdict:
    print(key)
print("Looping through values:")
for value in thisdict.values():
    print(value)
print("Looping through key-value pairs:")
for key, value in thisdict.items():
    print(f"{key}: {value}")

# 9. Notes on Dictionary Keys and Values
# Keys must be unique and immutable; values can be duplicated.
print("\n9. Notes on Dictionary Keys and Values")
thisdict = {
    'brand': 'Ford',
    'model': 'Ford',
    'year': 2020
}
print("Dictionary with duplicate values:", thisdict)
