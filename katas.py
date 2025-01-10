import math
primos=[2,3]
def is_prime(num):
    #negatives, 0 and 1 are not primes
    if num<=1: return False
    #calculating with already primes
    if num in primos: return True
    for p in primos:
        if num%p==0:
            return False
    #only up to square root of number
    limite=int(math.sqrt(num)+1)
    divisor=primos[len(primos)-1]+2
    while divisor < limite:
        if is_prime(divisor):
            primos.append(divisor)
        if num%divisor==0:
            return False
        divisor+=2
    return True

# def make_readable(seconds):
# #transform seconds into hours minutes and seconds separated by ':'
#     sol=""
#     for i in range(3):
#         resto = seconds%60
#         if i==2:
#             resto=seconds
#         seconds /= 60
#         resto=str(int(resto))
#         if len(str(resto))==1:
#             resto=str(0)+str(resto)
#         sol=":"+resto+sol
#     return (sol[1:])

# def move_zeros(lst):
# #move all zeroes from an array to the end of it while keeping the order of the rest
#     cont=0
#     for i in lst:
#         if i==0:
#             cont+=1
#     for i in range(cont):
#         lst.remove(0)
#         lst.append(0)
#     return (lst)

# import re
# def to_camel_case(text):
# #tansform a string into camelcase
#     if len(text)==0:
#         return ""
#     arr = re.split('[-|_]',text)
#     sol=""
#     for i in arr:
#         sol+=i[0].upper()+i[1:]
#     if text[0]!=text[0].upper():
#         sol=sol[0].lower()+sol[1:]
#     return (sol)

# def square_digits(num):
#     # return square of every digit of a number concatenated
#     cadena = str(num)
#     solucion=""
#     for i in cadena:
#         sol=0
#         sol+=int(i)**2
#         solucion+=str(sol)
#     return (int(solucion))

# def filter_list(l):
#     #return a new list with the strings filtered out
#     sol = []
#     for i in l:
#         if type(i)!=str:
#             sol.append(i)
#     return sol

# def odd_or_even(arr):
# #sum of digits of array is odd or even
#     sum = 0
#     for n in arr:
#         sum+=n
#     if sum%2:
#         return "odd"
#     else:
#         return "even"

# def digital_root(n):
# #sum of digits of a number, repeat until the result is only 1 digit
#     num = str(n)
#     sol = 0
#     for i in range(len(num)):
#         sol+=int(num[i])
#     cadena = str(sol)
#     if len(cadena)>1:sol=digital_root(sol)
#     return(sol)

# def solution(number):
# #multiples of 3 and 5 below number
#     sol = 0
#     for num in range(number):
#         if num%3==0 or num%5==0:
#             sol+=num
#     return (sol)