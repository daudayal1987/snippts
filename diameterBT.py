"""
Given a Binary Tree, find diameter of it.
The diameter of a tree is the number of nodes on the longest path between two end nodes in the tree
"""

import unittest

class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

def getDiameter(root):
    maxDiameter = [0]
    diameterUtil(root, maxDiameter)
    return maxDiameter[0]

def diameterUtil(root, maxDiameter):
    if root == None:
        return 0
    leftHeight = diameterUtil(root.left, maxDiameter)
    rightHeight = diameterUtil(root.right, maxDiameter)
    height = max(leftHeight, rightHeight) + 1
    maxDiameter[0] = max(maxDiameter[0], leftHeight + rightHeight + 1)
    return height

class TestTreeDiameter(unittest.TestCase):
    def test1(self):
        root = Node(10, left=Node(20), right=Node(30))
        self.assertEqual(getDiameter(root), 3)
    
    def test2(self):
        root = Node(10, 
                left=Node(20, 
                    left=Node(30), 
                    right=Node(40, 
                        left=Node(50), 
                        right=Node(60)
                    )
                ), 
                right=Node(70,
                    right=Node(80,
                        right=Node(90,
                            left=Node(100,
                                left=Node(110),
                                right=Node(120)
                            ),
                            right=Node(130)
                        )
                    )
                )
            )
        self.assertEqual(getDiameter(root), 9)

    def test3(self):
        root = Node(10, 
                left=Node(20,
                    left=Node(40,
                        left=Node(70),
                        right=Node(80,
                            left=Node(130,
                                left=Node(140),
                                right=Node(150)
                            )
                        )
                    ),
                    right=Node(50,
                        right=Node(90,
                            left=Node(100),
                            right=Node(110,
                                right=Node(120)
                            )
                        )
                    )
                ),
                right=Node(30,
                    right=Node(60)
                )
            )
        self.assertEqual(getDiameter(root), 9)

    def test4(self):
        root = Node(10, 
                left=Node(20,
                    left=Node(40,
                        left=Node(70),
                        right=Node(80,
                            left=Node(130,
                                left=Node(140),
                                right=Node(150)
                            )
                        )
                    ),
                    right=Node(50,
                        right=Node(90,
                            left=Node(100,
                                right=Node(110,
                                    right=Node(120)
                                )
                            )
                        )
                    )
                ),
                right=Node(30,
                    right=Node(60)
                )
            )
        self.assertEqual(getDiameter(root), 10)

    def test5(self):
        root = Node(10,
                left=Node(20,
                    left=Node(40),
                    right=Node(50)),
                right=Node(30))
        self.assertEqual(getDiameter(root), 4)

if __name__ == "__main__":
    unittest.main(verbosity=2)