thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}

# print(thisdict)

# Only values 
# print(thisdict.values())

# # only keys
# print(thisdict.keys())

# items() -- Print both keys and values
# print(thisdict.items())


# How to update 

# thisdict['brand'] = "new Brand"
# print(thisdict)
# print(thisdict['brand'])

# print(thisdict.get('brand'))


# # Add new value 
# thisdict['Owner'] = "Self"
# print(thisdict)

# We should not use duplicate keys , values can be duplicated
# thisdict = {
#   "brand": "Ford",
#   "model": "Ford",
#   "year": 2020
# }
# print(thisdict)


thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}
thisdict['Owner'] = "Self"
# # thisdict.update({"year": 2020})
# thisdict['year'] = "5000"

# pop -- We can remove one item at a time
# thisdict.pop('brand')
# thisdict.pop('brand')


# popitem -- This removes the last added item 
# thisdict.popitem()
# thisdict.popitem()
# print(thisdict)


# del thisdict['brand']

# print(thisdict)

# del thisdict

# clear 
# thisdict.clear()


# copy()
newDict= thisdict.copy()



