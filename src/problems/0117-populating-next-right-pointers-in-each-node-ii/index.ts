import { TreeNodeWithNext } from "../../structures/tree-node-with-next";

/**
 * 117. Populating Next Right Pointers in Each Node II
 *
 * In any binary tree, points each node's `next` at the node to its right on
 * the same level, or `null` for the last node, and returns the root. The
 * tree is modified in place.
 *
 * Works a level at a time: walks the current level through the `next`
 * pointers already set, chaining its children into the next level behind a
 * dummy node that marks where that level starts. Uses no queue.
 *
 * @see https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * nextPointersToArray(populatingNextRightPointersInEachNodeII(treeWithNextFromArray([1, 2, 3, 4, 5, null, 7])));
 * // [1, "#", 2, 3, "#", 4, 5, 7, "#"]
 */
export const populatingNextRightPointersInEachNodeII = (
	root: TreeNodeWithNext | null,
): TreeNodeWithNext | null => {
	const nextLevel = new TreeNodeWithNext();
	let levelStart = root;

	while (levelStart) {
		let tail = nextLevel;
		for (
			let node: TreeNodeWithNext | null = levelStart;
			node;
			node = node.next
		) {
			if (node.left) {
				tail.next = node.left;
				tail = node.left;
			}
			if (node.right) {
				tail.next = node.right;
				tail = node.right;
			}
		}
		levelStart = nextLevel.next;
		nextLevel.next = null;
	}

	return root;
};
