# 

myList = [12,23,45,56,57,[2123,455,6788,904,4658],34,50,{"Name":"Arvinder","Country":"India","Pincode":"123456"},(234,123,890,572,704)]

# 45
print(myList[2])

# 904
print(myList[5][3])

# India
print(myList[8]['Country'])
print(myList[8].get('Country'))

# 123 - from tuple inside list
print(myList[9][1])


