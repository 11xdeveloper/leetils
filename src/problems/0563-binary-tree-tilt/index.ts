import type { TreeNode } from "../../structures/tree-node";

/**
 * 563. Binary Tree Tilt
 *
 * A node's tilt is the absolute difference between the sums of its left and
 * right subtrees. Returns the sum of every node's tilt.
 *
 * Computes subtree sums in postorder, adding each node's tilt as its sum is
 * found. It uses an explicit stack, so deep trees don't overflow the call
 * stack.
 *
 * @see https://leetcode.com/problems/binary-tree-tilt/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeTilt(treeFromArray([4, 2, 9, 3, 5, null, 7])); // 15
 */
export const binaryTreeTilt = (root: TreeNode | null): number => {
	const sums = new Map<TreeNode | null, number>([[null, 0]]);
	let tilt = 0;
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const left = sums.get(node.left) ?? 0;
		const right = sums.get(node.right) ?? 0;
		tilt += Math.abs(left - right);
		sums.set(node, node.val + left + right);
	}

	return tilt;
};
