def solution(number):
#multiples of 3 and 5 below number
    sol = 0
    for num in range(number):
        if num%3==0 or num%5==0:
            sol+=num
    return (sol)