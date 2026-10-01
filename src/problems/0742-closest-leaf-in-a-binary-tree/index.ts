import type { TreeNode } from "../../structures/tree-node";

/**
 * 742. Closest Leaf in a Binary Tree
 *
 * Returns the value of a leaf nearest (in edges) to the node with value
 * `k`, in a binary tree with distinct values. Any nearest leaf is accepted.
 *
 * Records every node's parent, then runs a breadth-first search from the
 * target through children and parents alike; the first leaf reached is a
 * nearest one.
 *
 * @see https://leetcode.com/problems/closest-leaf-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * closestLeafInABinaryTree(treeFromArray([1, 2, 3, 4, null, null, null, 5, null, 6]), 2); // 3
 */
export const closestLeafInABinaryTree = (
	root: TreeNode | null,
	k: number,
): number => {
	const parent = new Map<TreeNode, TreeNode | null>();
	let target: TreeNode | null = null;
	const stack = root ? [root] : [];
	if (root) parent.set(root, null);
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val === k) target = node;
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			parent.set(child, node);
			stack.push(child);
		}
	}

	const seen = new Set(target ? [target] : []);
	const queue = target ? [target] : [];
	for (const node of queue) {
		if (!node.left && !node.right) return node.val;
		for (const next of [node.left, node.right, parent.get(node) ?? null]) {
			if (next && !seen.has(next)) {
				seen.add(next);
				queue.push(next);
			}
		}
	}
	return -1;
};
