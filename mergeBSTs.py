"""
Given two BSTs, return elements of both BSTs in sorted form.
"""
import unittest

class Node:
    def __init__(self, data, left=None, right=None) -> None:
        self.data = data
        self.left = left
        self.right = right

class mergeBST:
    def __init__(self, root1, root2) -> None:
        self.s1 = []
        self.s2 = []
        self.curr1 = root1
        self.curr2 = root2
        self.out = []

    def inorder(self, root):
        if not root:
            return
        self.inorder(root.left)
        self.out.append(root.data)
        self.inorder(root.right)

    def merge(self):
        while self.curr1 or self.curr2 or self.s1 or self.s2:
            if self.curr1 or self.curr2:
                if self.curr1:
                    self.s1.append(self.curr1)
                    self.curr1 = self.curr1.left
                if self.curr2:
                    self.s2.append(self.curr2)
                    self.curr2 = self.curr2.left
            else:
                if not self.s1:
                    self.curr2 = self.s2.pop()
                    self.out.append(self.curr2.data)
                    self.inorder(self.curr2.right)
                    self.curr2 = None
                elif not self.s2:
                    self.curr1 = self.s1.pop()
                    self.out.append(self.curr1.data)
                    self.inorder(self.curr1.right)
                    self.curr1 = None
                else:
                    self.curr1 = self.s1.pop()
                    self.curr2 = self.s2.pop()
                    if self.curr1.data <= self.curr2.data:
                        self.out.append(self.curr1.data)
                        self.curr1 = self.curr1.right
                        self.s2.append(self.curr2)
                        self.curr2 = None
                    elif self.curr2.data <= self.curr1.data:
                        self.out.append(self.curr2.data)
                        self.curr2 = self.curr2.right
                        self.s1.append(self.curr1)
                        self.curr1 = None
        return self.out

class TestBSTMerge(unittest.TestCase):
    def setUp(self) -> None:
        return super().setUp()
        
    def tearDown(self) -> None:
        return super().tearDown()

    def test1(self):
        root1 = Node(5, left=Node(3, left=Node(2), right=Node(4)), right=Node(6))
        root2 = Node(2, left=Node(1), right=Node(3, right=Node(7, left=Node(6))))
        self.assertSequenceEqual(mergeBST(root1, root2).merge(), [1, 2, 2, 3, 3, 4, 5, 6, 6, 7])

    def test2(self):
        root1 = Node(12, left=Node(9, left=Node(6), right=Node(11)))
        root2 = Node(8, left=Node(5, left=Node(2)), right=Node(10))
        self.assertSequenceEqual(mergeBST(root1, root2).merge(), [2, 5, 6, 8, 9, 10, 11, 12])

    def test3(self):
        root1 = Node(20, left=Node(9, left=Node(6), right=Node(11, right=Node(12, right=Node(13, right=Node(14, right=Node(15)))))), right=Node(21, right=Node(22, right=Node(30, left=Node(25)))))
        root2 = Node(8, left=Node(5, left=Node(2)), right=Node(10))
        self.assertSequenceEqual(mergeBST(root1, root2).merge(), [2, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 25, 30])

if __name__ == "__main__":
    unittest.main(verbosity=2)
