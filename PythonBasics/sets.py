myset = {"apple", "banana", "cherry"}

# emptySet = set()
mySet2 = {1,2,3,4,5,2,1,3,2,6}
# Sets -- Unordered , unique values , 

# True -- 1 -- 1.0 -- 1.000 ----> All of thses are same
# mySet2 = {1,True,1.0, 1.0000}
# mySet2 = {1.0, 1.0000,1,True}
# print(mySet2)


# False -- 0 -- 0.000 ----> All are same 

# mySet3 = {True,1 , False,0}
# print(mySet3)


# We can't change the existing values in the set but we can add new values 
# mySet2.add(100)
# mySet2.add(-110)
# print(mySet2)


thisset = {"apple", "banana", "cherry"}
tropical = {"pineapple", "mango", "papaya"}

# thisset.update(tropical)

# print(thisset)


# Remove , discard , pop

# thisset.remove("apple")
# It will throw an error if element is not present in the set
# thisset.remove("apples")


# thisset.discard("apple")
# Discard will not throw an error even if the value is not present in the set
# thisset.discard("apples")
# print(thisset)


# pop()

# print(tropical.pop())
# print(tropical)


# clear
# thisset.clear()

# del 
# del thisset

# SET Operations
set1 = {12,23,45,67,34,20}
set2 = {31,12,45,76,98,80}

# Union -- union() , update(), | 
# print(set1.union(set2))
# # set1.update(set2)
# # print(set1)
# print(set1 | set2)

# The above operations combines all the elements from different sets  --- There will be no duplicates


# Intersection -- Takes only the common elements between two sets 
# print(set1.intersection(set2))
# print(set1 & set2)

# Disjoint Sets -- Means there is nothing common between two sets 

print(set1.isdisjoint(set2))

set3 = {111,222,333,444}
print(set1.isdisjoint(set3))
