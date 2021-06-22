class BinomialTree:
    def __init__(self, data, priority):
        self.data = data
        self.priority = priority
        self.degree = 0
        self.children = []

    def addChildAtEnd(self, child):
        self.children.append(child)
        self.degree +=1

    def __str__(self) -> str:
        return str(self.data) + " (" + str(self.degree) + ")"

class BinomialHeap:
    def __init__(self):
        self.binomialTrees = []

    def isEmpty(self):
        return self.binomialTrees == []

    def addTrees(self, trees):
        self.binomialTrees.extend(trees)
        self.binomialTrees.sort(key=lambda tree: tree.degree)

    def getMin(self):
        if self.isEmpty():
            return None
        temp = self.binomialTrees[0]
        for tree in self.binomialTrees:
            if tree.priority < temp.priority:
                temp = tree
        return temp.data
    
    def extractMin(self):
        if self.isEmpty():
            return
        i = 0
        for j in range(1, len(self.binomialTrees)):
            if self.binomialTrees[j].priority < self.binomialTrees[i].priority:
                i = j
        temp = self.binomialTrees[i]
        del self.binomialTrees[i]
        newH = BinomialHeap()
        newH.binomialTrees = temp.children
        self.merge(newH)
        return temp.data

    def insert(self, data, priority):
        print("Inserting ", data)
        newH = BinomialHeap()
        newH.binomialTrees.append(BinomialTree(data, priority))
        self.merge(newH)

    def merge(self, newH):
        if newH.binomialTrees == []: return
        self.addTrees(newH.binomialTrees)
        i = 0
        while i < len(self.binomialTrees) - 1:
            current = self.binomialTrees[i]
            next = self.binomialTrees[i+1]
            if current.degree == next.degree:
                if i+1 < (len(self.binomialTrees) - 1) and self.binomialTrees[i+1].degree == self.binomialTrees[i+2].degree:
                    next_next = self.binomialTrees[i+2]
                    if next.priority <= next_next.priority:
                        next.addChildAtEnd(next_next)
                        del self.binomialTrees[i+2]
                    else:
                        next_next.addChildAtEnd(next)
                        del self.binomialTrees[i+1]
                else:
                    if current.priority <= next.priority:
                        current.addChildAtEnd(next)
                        del self.binomialTrees[i+1]
                    else:
                        next.addChildAtEnd(current)
                        del self.binomialTrees[i]
            i += 1

def printTrees(trees):
    for tree in trees:
        print(tree, end=" ")
        printTrees(tree.children)
    
def printHeap(heap):
    printTrees(heap.binomialTrees)
    print("")

heap = BinomialHeap()
heap.insert(10, 10)
printHeap(heap)
heap.insert(20, 20)
printHeap(heap)
heap.insert(30, 30)
printHeap(heap)
heap.insert(40, 40)
printHeap(heap)
heap.insert(50, 50)
printHeap(heap)
heap.insert(60, 60)
printHeap(heap)
heap.insert(70, 70)
printHeap(heap)
heap.insert(80, 80)
printHeap(heap)
heap.insert(90, 90)
printHeap(heap)
heap.insert(100, 100)
printHeap(heap)
heap.insert(110, 110)
printHeap(heap)
heap.insert(120, 120)
printHeap(heap)
heap.insert(130, 130)
printHeap(heap)
heap.insert(140, 140)
printHeap(heap)
heap.insert(150, 150)
printHeap(heap)
heap.insert(160, 160)
printHeap(heap)

# printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
printHeap(heap)
print('extract min', heap.extractMin())
print(heap.isEmpty())