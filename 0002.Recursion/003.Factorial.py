# 4! = 4*3*2*1 = 24

# 5! = 5*4*3*2*1 = 120

# 6! = 6*5*4*3*2*1 = 720

# 10 -- 1 
def factorial(n):
    if n ==0 or n ==1:
        return 1
    return n * factorial(n-1)

n = 6
print(factorial(n))


