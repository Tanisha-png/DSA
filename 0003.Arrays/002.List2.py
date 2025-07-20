# Find count of digits of a number 

# 12345 -- 5 
# 345678 - 6

# Method - 1:  int to str -- Len()

# num = 123445667
# print(len(str(num)))

num = 125673

# // %
# print(num//10)
# print(num%10)

"""
def CountDigits(n):
    count = 0

    while n!=0:
        n = n//10
        count +=1
    return count 

print(CountDigits(1234456))
"""


# 1234456 -- 123445 -- Count = 1
# 123445 --- 12344  --- Count = 2
# 12344 --   1234   -- Count = 3
# 1234   --   123    --- Count = 4
# 123  ---- 12 --- count = 5
# 12  --- 1 ---  count = 6
# 1  --- 0 -- Count = 7



# Sum of digits of a number -- 12345 -- 15 

"""
def SumOfDigits(n):
    result = 0

    while n!=0:
        temp = n%10
        result += temp
        n = n//10
    return result 

print(SumOfDigits(12345))
"""

# 12345  -- temp =5  --> result = 5 ---> 1234
# 1234  -- temp =4  --> result = 9 ---> 123
# 123 -- temp =3  --> result = 12 ---> 12
# 12  -- temp =2  --> result = 14 ---> 1
# 1 -- temp =1  --> result = 15 ---> 0


# Find the prodcut of all the digits of a number 
"""
def ProdDigits(n):
    result = 1 

    while n !=0:
        temp = n%10 
        result*= temp 
        n = n//10
    
    return result 

print(ProdDigits(12345))
"""

# result = 1
# 12345  -- temp =5  --> result = 5 ---> 1234
# 1234  -- temp =4  --> result = 20 ---> 123
# 123 -- temp =3  --> result = 60 ---> 12
# 12  -- temp =2  --> result = 120 ---> 1
# 1 -- temp =1  --> result = 120 ---> 0

# Find the sum of Even Digits 

"""
def SumEven(n):
    result = 0
    while n!=0:
        temp = n%10
        if temp%2 ==0:
            result +=temp 
        
        n = n//10

    return result 
    
print(SumEven(12345))
"""


# Count of Digits greater than a specific number 
# 123456  --- 4 

"""
def GreaterDigits(n,k):
    count =0
    while n!=0:
        temp = n%10 

        if temp > k:
            count+=1
        
        n = n//10
    return count 
print(GreaterDigits(123874,3))
"""

# Assignment --- 15-07-2025
# Find the largest Digit in a number 
def largest_digit(number):
    return max(int(digit) for digit in str(abs(number)))

num = 792615
print("Largest digit:", largest_digit(num))


# Count the freq of a specific digit
def count_digit_frequency(number, target_digit):
    return str(abs(number)).count(str(target_digit))

num = 44792464
digit = 4

print(f"Digit {digit} appears {count_digit_frequency(num, digit)} times.")

# Count the factors of a number 

def factor_num(nums):
    result = 1
    while nums != 0:
        temp = nums % 10
        result *= temp
        nums = nums // 10

    return result

print(factor_num(12))

# Count the composite and Prime Numbers 


# COunt the freq of each and every digit

# Average of sum of digits 



# Count multiples of a number

# Sum of Even and Odd digits  
# def sum_even_odd_digits(number):
#     number = abs(number)  
#     even_sum = 0
#     odd_sum = 0
    
#     for digit in str(number):
#         d = int(digit)
#         if d % 2 == 0:
#             even_sum += d
#         else:
#             odd_sum += d

#     return even_sum, odd_sum

# num = 58374
# even, odd = sum_even_odd_digits(num)
# print(f"Even digit sum: {even}")
# print(f"Odd digit sum: {odd}")


# AlternateDigitSum --