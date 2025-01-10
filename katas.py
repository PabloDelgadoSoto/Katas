def digital_root(n):
#sum of digits of a number, repeat until the result is only 1 digit
    num = str(n)
    sol = 0
    for i in range(len(num)):
        sol+=int(num[i])
    cadena = str(sol)
    if len(cadena)>1:sol=digital_root(sol)
    return(sol)

# def solution(number):
# #multiples of 3 and 5 below number
#     sol = 0
#     for num in range(number):
#         if num%3==0 or num%5==0:
#             sol+=num
#     return (sol)