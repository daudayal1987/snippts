"""
The stock span problem is a financial problem where we have a series of n daily price quotes for a stock and we need to calculate the span of stock’s price for all n days. 
The span Si of the stock’s price on a given day i is defined as the maximum number of consecutive days just before the given day, for which the price of the stock on the current day is less than or equal to its price on the given day.
For example, if an array of 7 days prices is given as {100, 80, 60, 70, 60, 75, 85}, then the span values for corresponding 7 days are {1, 1, 1, 2, 1, 4, 6}.

Input: 
N = 7, price[] = [100 80 60 70 60 75 85]
Output:
1 1 1 2 1 4 6
Explanation:
Traversing the given input span for 100 
will be 1, 80 is smaller than 100 so the 
span is 1, 60 is smaller than 80 so the 
span is 1, 70 is greater than 60 so the 
span is 2 and so on. Hence the output will 
be 1 1 1 2 1 4 6.


Input: 
N = 6, price[] = [10 4 5 90 120 80]
Output:
1 1 2 4 5 1
Explanation:
Traversing the given input span for 10 
will be 1, 4 is smaller than 10 so the 
span will be 1, 5 is greater than 4 so 
the span will be 2 and so on. Hence, the 
output will be 1 1 2 4 5 1.
"""

def calculateSpan(arr, n):
    opList = [1] * n
    for i in range(1, n):
        if arr[i] < arr[i-1]:
            opList[i] = 1
        else:
            j = i-1
            cnt = 1
            while j >= 0 and arr[j] <= arr[i]:
                cnt += opList[j]
                j -= opList[j]
            opList[i] = cnt
    return opList

testCases = [
    [100, 80, 60, 70, 60, 75, 85],
    [10, 4, 5, 90, 120, 80]
]

for case in testCases:
    print(case, '=>', calculateSpan(case, len(case)))