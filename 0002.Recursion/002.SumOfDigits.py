# n = 1234  -- Sum = 1+2+3+4 = 10

#1,2 ,3 ,4 

# n = 4234
# # n = 5
# print(n//10)

def SumOfDigits(n):
    total =0

    if n==0:
        return 0
    else:
        return n%10 + SumOfDigits(n//10)

print(SumOfDigits(43465))


