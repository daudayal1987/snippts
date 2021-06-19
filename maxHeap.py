import unittest
import math

class maxHeap:
    def __init__(self, items):
        self.items = items
        self.size = len(self.items) - 1
        self.build()

    def getParent(self, pos):
        return math.ceil(pos / 2)-1

    def getLeftChild(self, pos):
        return 2*pos+1

    def getRightChild(self, pos):
        return 2*pos+2

    def swap(self, i, j):
        self.items[i], self.items[j] = self.items[j], self.items[i]

    def build(self):
        for i in range(self.getParent(self.size), -1, -1):
            self.heapify(i)

    def heapify(self, i):
        left = self.getLeftChild(i)
        right = self.getRightChild(i)
        largest = i
        if left<=self.size and self.items[largest] < self.items[left]:
            largest = left
        if right<=self.size and self.items[largest] < self.items[right]:
            largest = right

        if largest != i:
            self.swap(i, largest)
            self.heapify(largest)

    def push(self, item):
        self.size += 1
        self.items.append(item)

        current = self.size
        while self.getParent(current) >= 0 and self.items[self.getParent(current)] < self.items[current]:
            self.swap(current, self.getParent(current))
            current = self.getParent(current)

    def pop(self):
        self.swap(0, self.size)
        self.size -= 1
        self.heapify(0)
        return self.items.pop()

    def getMax(self):
        return self.items[0]

    def getList(self):
        return self.items

    def isEmpty(self):
        return self.size == -1
    

class TestHeap(unittest.TestCase):
    def test_heap(self):
        heap = maxHeap([5, 7, 1, 10, 15, 4, 2, 18, 20, 8])
        expected = [20, 18, 4, 10, 15, 1, 2, 7, 5, 8]
        self.assertSequenceEqual(heap.getList(), expected)

    def test_heap_push(self):
        heap = maxHeap([5, 7, 1, 10, 15, 4, 2, 18, 20, 8])
        
        heap.push(100)
        expected = [100, 20, 4, 10, 18, 1, 2, 7, 5, 8, 15]
        self.assertSequenceEqual(heap.getList(), expected)

        heap.push(50)
        expected = [100, 20, 50, 10, 18, 4, 2, 7, 5, 8, 15, 1]
        self.assertSequenceEqual(heap.getList(), expected)

    def test_heap_pop(self):
        heap = maxHeap([5, 7, 1, 10, 15, 4, 2, 18, 20, 8])

        self.assertEqual(heap.pop(), 20)
        expected = [18, 15, 4, 10, 8, 1, 2, 7, 5]
        self.assertSequenceEqual(heap.getList(), expected)

        self.assertEqual(heap.pop(), 18)
        expected = [15, 10, 4, 7, 8, 1, 2, 5]
        self.assertSequenceEqual(heap.getList(), expected)

    def test_heap_extract_max(self):
        heap = maxHeap([5, 7, 1, 10, 15, 4, 2, 18, 20, 8])
        self.assertEqual(heap.getMax(), 20)
        self.assertEqual(heap.pop(), 20)
        self.assertEqual(heap.getMax(), 18)
        self.assertEqual(heap.pop(), 18)
        self.assertEqual(heap.getMax(), 15)
        self.assertEqual(heap.pop(), 15)
        self.assertEqual(heap.getMax(), 10)
        self.assertEqual(heap.pop(), 10)
        self.assertEqual(heap.getMax(), 8)
        self.assertEqual(heap.pop(), 8)
        self.assertEqual(heap.getMax(), 7)
        self.assertEqual(heap.pop(), 7)
        self.assertEqual(heap.getMax(), 5)
        self.assertEqual(heap.pop(), 5)
        self.assertEqual(heap.getMax(), 4)
        self.assertEqual(heap.pop(), 4)
        self.assertEqual(heap.getMax(), 2)
        self.assertEqual(heap.pop(), 2)
        self.assertEqual(heap.getMax(), 1)
        self.assertEqual(heap.pop(), 1)
        self.assertEqual(heap.isEmpty(), True)

if __name__ == "__main__":
    unittest.main()