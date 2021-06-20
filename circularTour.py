"""
"""

def getStartingPoint(lis):
    petrol = 0
    distance = 0
    pos = 0
    for i in range(len(lis)):
        petrol += lis[i][0] - lis[i][1]
        if petrol < 0:
            distance += -1 * petrol
            petrol = 0
            pos = i+1
    return pos if petrol >= distance else -1
    
testCases = [
    [
        [4, 6, 7, 4],
        [6, 5, 3, 5]
    ],
    [
        [4, 6, 7],
        [6, 3, 7]
    ],
    [
        [1, 10, 3],
        [5, 3, 4]
    ],
    [
        [1, 2, 3, 4, 5],
        [3, 4, 5, 1, 2]
    ],
    [
        [5, 2, 11, 8],
        [3, 7, 2, 9]
    ],
    [
        [55, 33, 77, 40],
        [52, 100, 61, 69]
    ],
    [
        [87, 40, 71, 79,  2,  3, 93, 57, 81, 42, 90, 20, 30],
        [27, 95, 96, 35, 68, 98, 18, 53,  2, 87, 66, 45, 41]
    ]
]

for test in testCases:
    print(list(zip(test[0], test[1])), "=>", getStartingPoint(list(zip(test[0], test[1]))))