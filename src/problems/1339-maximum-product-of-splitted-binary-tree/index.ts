import type { TreeNode } from "../../structures/tree-node";

/**
 * 1339. Maximum Product of Splitted Binary Tree
 *
 * Cutting one edge splits the tree in two. Returns the largest product of
 * the two parts' sums, modulo 10^9 + 7 (maximised before reducing).
 *
 * Every cut separates one subtree with sum `s` from the rest, giving
 * `s · (total − s)`, which is largest when `s` is closest to half the
 * total. Subtree sums come from a reverse preorder pass. The product can
 * pass 2^53, so it's computed with BigInt.
 *
 * @see https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumProductOfSplittedBinaryTree(treeFromArray([1, 2, 3, 4, 5, 6])); // 110
 */
export const maximumProductOfSplittedBinaryTree = (
	root: TreeNode | null,
): number => {
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	const sums = new Map<TreeNode, number>();
	for (const node of order.reverse()) {
		const left = node.left ? (sums.get(node.left) ?? 0) : 0;
		const right = node.right ? (sums.get(node.right) ?? 0) : 0;
		sums.set(node, node.val + left + right);
	}
	const total = root ? (sums.get(root) ?? 0) : 0;
	let closest = 0;
	for (const [node, sum] of sums) {
		if (
			node !== root &&
			Math.abs(total - 2 * sum) < Math.abs(total - 2 * closest)
		)
			closest = sum;
	}
	return Number((BigInt(closest) * BigInt(total - closest)) % 1_000_000_007n);
};
