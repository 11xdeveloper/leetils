import type { TreeNode } from "../../structures/tree-node";

/**
 * 1740. Find Distance in a Binary Tree
 *
 * Returns the number of edges between the nodes with values `p` and `q`
 * in a tree of unique values.
 *
 * Record every node's parent and depth, then climb from the deeper node
 * until the two paths meet.
 *
 * @see https://leetcode.com/problems/find-distance-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findDistanceInABinaryTree(treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]), 5, 0); // 3
 */
export const findDistanceInABinaryTree = (
	root: TreeNode | null,
	p: number,
	q: number,
): number => {
	const parent = new Map<TreeNode, TreeNode | null>();
	const depth = new Map<TreeNode, number>();
	const byValue = new Map<number, TreeNode>();
	const stack = root ? [root] : [];
	if (root) {
		parent.set(root, null);
		depth.set(root, 0);
	}
	for (let node = stack.pop(); node; node = stack.pop()) {
		byValue.set(node.val, node);
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			parent.set(child, node);
			depth.set(child, (depth.get(node) ?? 0) + 1);
			stack.push(child);
		}
	}
	let [a, b] = [byValue.get(p) ?? null, byValue.get(q) ?? null];
	let distance = 0;
	while (a && b && a !== b) {
		if ((depth.get(a) ?? 0) >= (depth.get(b) ?? 0)) a = parent.get(a) ?? null;
		else b = parent.get(b) ?? null;
		distance++;
	}
	return distance;
};
