"""
Given a binary tree in which each node element contains a number. Find the maximum possible sum from one leaf node to another leaf node.

NOTE: Here Leaf node is a node which is connected to exactly one different node.

https://practice.geeksforgeeks.org/problems/maximum-path-sum/1
Expected Time Complexity: O(N)
Expected Auxiliary Space: O(Height of Tree)
"""

import sys
import unittest

class Node:
    def __init__(self, X):
        self.data = X
        self.left = None
        self.right = None

class BT:
    def __init__(self):
        self.root = None

    def getMaxPathSum(self):
        maxSum = [-sys.maxsize]
        calculateMaxUtil(self.root, maxSum)
        return maxSum[0]


def calculateMaxUtil(root, maxSum):
    if root.left == None and root.right == None:
        return root.data
    if root.left == None:
        return calculateMaxUtil(root.right, maxSum) + root.data
    if root.right == None:
        return root.data + calculateMaxUtil(root.left, maxSum)

    lMax = calculateMaxUtil(root.left, maxSum)
    rMax = calculateMaxUtil(root.right, maxSum)

    maxSum[0] = max(maxSum[0], lMax + root.data + rMax)
    return max(lMax + root.data, root.data + rMax)
        

class Test(unittest.TestCase):
    def test1(self):
        tree = BT()
        tree.root = Node(3)
        tree.root.left = Node(4)
        tree.root.left.left = Node(-10)
        tree.root.left.right = Node(4)
        tree.root.right = Node(5)
        self.assertEqual(tree.getMaxPathSum(), 16, "Should be 16")

    def test2(self):
        tree = BT()
        tree.root = Node(-15)
        tree.root.left = Node(5)
        tree.root.left.left = Node(-8)
        tree.root.left.left.left = Node(2)
        tree.root.left.left.right = Node(-3)
        tree.root.left.right = Node(1)
        tree.root.right = Node(6)
        tree.root.right.left = Node(3)
        tree.root.right.right = Node(9)
        tree.root.right.right.right = Node(0)
        tree.root.right.right.right.left = Node(4)
        tree.root.right.right.right.right = Node(-1)
        tree.root.right.right.right.right.left = Node(10)
        self.assertEqual(tree.getMaxPathSum(), 27, "Should be 27")
    
    def test3(self):
        tree = BT()
        tree.root = Node(-9)
        tree.root.left = Node(6)
        tree.root.right = Node(-10)
        self.assertEqual(tree.getMaxPathSum(), -13, "Should be -13")

    def test4(self):
        tree = BT()
        tree.root = Node(-10)
        tree.root.left = Node(-1)
        tree.root.left.left = Node(3)
        tree.root.right = Node(0)
        self.assertEqual(tree.getMaxPathSum(), -8, "Should be -8")

unittest.main()

