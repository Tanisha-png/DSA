# i =0 
# while i<5:
#     print(i)
#     i+=1

# def PrintNumber(n):
#     if n >5:
#         return 
#     print(n)
#     PrintNumber(n+1)

# PrintNumber(0)

# sum =0
# for i in range(10):
#     sum+=i

# print(sum)


def SumOfnumber(n):
    if n >=10:
        return 0
    return n + SumOfnumber(n+1)



# n =0    retrun 0 + SumOfNumber(1)
# n =1 return 0 + 1 + SumOfnumber(2)
# n =2 return 0 + 1 + 2 +  SumOfnumber(3)
# n =3 return 0 + 1 + 2 + 3+  SumOfnumber(4)
# n =4 return 0 + 1 + 2 + 3+ 4  + SumOfnumber(5)
# n =5 return 0 + 1 + 2 + 3 + 4 + 5 +  SumOfnumber(6)
# n =6 return 0 + 1 + 2 + 3 + 4 + 5 + 6 +   SumOfnumber(7)
# n =7 return 0 + 1 + 2 + 3 + 4 + 5 + 6  + 7+  SumOfnumber(8)
# n =8 return 0 + 1 + 2 + 3 + 4 + 5 + 6 +7 + 8 + SumOfnumber(9)
# n =9 return 0 + 1 + 2 + 3 + 4 + 5 + 6 +7 + 8 + 9+ 0


print(SumOfnumber(0))