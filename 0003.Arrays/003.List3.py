# def every_digit (nums):
    
#     while nums != 0:
#         temp = nums % 10
#         print(temp)
#         nums = nums // 10

# every_digit(14689)

# def sum_of_digits (nums):
#     result = 0
#     while nums != 0:
#         temp = nums % 10
#         result += temp
#         nums = nums // 10

#     return result

# print(sum_of_digits(494961))

# def product_of_digit (nums):
#     result = 1
#     while nums != 0:
#         temp = nums % 10
#         result *= temp
#         nums = nums // 10

#     return result

# print(product_of_digit(35791))

# def digit_greater(nums, k):
#     count = 0
#     while nums != 0:
#         temp = nums % 10
#         if temp > k:
#             count += 1
#         nums = nums // 10
    
#     return count

# print(digit_greater(35297, 4))

def sum_of_even_digits(nums):
    result = 0
    while nums != 0:
        temp = nums % 10
        if temp % 2 == 0:
            result += temp
        nums = nums // 10
    return result

print(sum_of_even_digits(135869))

    
        
