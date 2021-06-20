"""
Given a string S with repeated characters. The task is to rearrange characters in a string such that no two adjacent characters are the same. 

Note: The string has only lowercase English alphabets and it can have multiple solutions. Return any one of them.

Example: 1
Input : 
str = "geeksforgeeks"
Output: 1
Explanation:
All the repeated characters of the 
given string can be rearranged so 
that no adjacent characters in the 
string is equal. Any correct 
rearrangement will show a output of 1.

Example: 2
Input : 
str = "bbbbb"
Output: 0
Explanation : 
Repeated characters in the string cannot 
be rearranged such that there should not 
be any adjacent repeated character.
"""
import math

class maxHeap:
    def __init__(self, items = None):
        self.size = len(items) if items else -1
        self.items = items or []
        if items:
            self.build()

    def isEmpty(self):
        return self.size == -1

    def parent(self, pos):
        return math.ceil(pos / 2) - 1

    def left(self, pos):
        return 2*pos + 1

    def right(self, pos):
        return 2*pos + 2

    def swap(self, i, j):
        self.items[i], self.items[j] = self.items[j], self.items[i]

    def heapify(self, pos):
        left = self.left(pos)
        right = self.right(pos)
        largest = pos
        if left<=self.size and self.items[left]["priority"] > self.items[largest]["priority"]:
            largest = left
        if right<=self.size and self.items[right]["priority"] > self.items[largest]["priority"]:
            largest = right
        if largest != pos:
            self.swap(pos, largest)
            self.heapify(largest)

    def build(self):
        for i in range(self.parent(self.size), -1, -1):
            self.heapify(i)

    def push(self, item):
        self.items.append(item)
        self.size += 1
        current = self.size
        parent = self.parent(current)
        while parent >= 0 and self.items[parent]["priority"] < self.items[current]["priority"]:
            self.swap(current, parent)
            current = parent
            parent = self.parent(current)

    def pop(self):
        if self.isEmpty():
            raise IndexError("Heap is empty")
        self.swap(0, self.size)
        self.size -= 1
        self.heapify(0)
        return self.items.pop()

def rearrangeString(string):
    hash = dict()
    for ch in string:
        hash[ch] = hash.get(ch) or 0
        hash[ch] += 1
    
    heap = maxHeap()
    for key, value in hash.items():
        heap.push({"char": key, "priority": value})

    prev = {"char": "#", "priority": -1}
    result = ""
    while not heap.isEmpty():
        current = heap.pop()
        result += current["char"]
        if prev["priority"] > 0:
            heap.push(prev)
        current["priority"] -= 1
        prev = current

    return result if len(result) == len(string) else -1
        
#########################        
testCases = [
    "geeksforgeeks",
    "bbbb",
    "mississipie",
    "axiqenxohssbtwwwwwwwwwwwwwww",
    "kkk"
]

for case in testCases:
    print(case, "=>", rearrangeString(case))