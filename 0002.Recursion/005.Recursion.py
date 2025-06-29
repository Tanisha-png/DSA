# i = 0
# while i < 5:
#     print(i)
#     i += 1

# def PrintNumber(n):

#     if n > 5:
#         return 
#     print(n)
#     PrintNumber(n+1)

# PrintNumber(0)

# sum = 0
# for i in range(10):
#     sum += i

# print(sum)



def SumOfNumbers(n):
    if n >= 10:
        return 0
    return n + SumOfNumbers(n+1)

# n = 0.  return 0 + SumOfNumbers(1)

# n = 1 return 0 + 1 + SumOfNumbers(2)

print(SumOfNumbers(0))
    
    