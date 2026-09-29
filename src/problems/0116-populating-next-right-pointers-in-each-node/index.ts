import type { TreeNodeWithNext } from "../../structures/tree-node-with-next";

/**
 * 116. Populating Next Right Pointers in Each Node
 *
 * In a perfect binary tree (every level full), points each node's `next` at
 * the node to its right on the same level, or `null` for the last node, and
 * returns the root. The tree is modified in place.
 *
 * Works a level at a time using the `next` pointers already set on the level
 * above: each node links its left child to its right child, and its right
 * child to the left child of its `next` node. Uses no queue.
 *
 * @see https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * nextPointersToArray(populatingNextRightPointersInEachNode(treeWithNextFromArray([1, 2, 3, 4, 5, 6, 7])));
 * // [1, "#", 2, 3, "#", 4, 5, 6, 7, "#"]
 */
export const populatingNextRightPointersInEachNode = (
	root: TreeNodeWithNext | null,
): TreeNodeWithNext | null => {
	for (let levelStart = root; levelStart?.left; levelStart = levelStart.left) {
		for (
			let node: TreeNodeWithNext | null = levelStart;
			node;
			node = node.next
		) {
			if (!node.left || !node.right) continue;
			node.left.next = node.right;
			node.right.next = node.next?.left ?? null;
		}
	}

	return root;
};
