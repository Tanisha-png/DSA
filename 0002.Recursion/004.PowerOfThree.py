# 27 -- 3*3*3 = 27 -- True
# 36 - False

def IsPowerThree(n):
    if n <1:
        return False
    if n==1:
        return True
    
    return n%3==0 and IsPowerThree(n//3)

n = 29
print(IsPowerThree(n))
