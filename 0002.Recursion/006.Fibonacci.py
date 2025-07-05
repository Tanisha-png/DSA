# 0 1 1 2 3 5 8 13
def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    return fib(n-1) + fib(n-2)

print(fib(7))

# Tribonacci Series
# 0 1 1 2 4 7 13
def trib(n):
    if n == 0:
        return 0
    if n == 1 or n == 2:
        return 1
    
    return trib(n-1) + trib(n-2) + trib(n-3)

print(trib(7))
