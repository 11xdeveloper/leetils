import type { TreeNode } from "../../structures/tree-node";

/**
 * 2792. Count Nodes That Are Great Enough
 *
 * A node is great enough if its subtree has at least `k` nodes with
 * smaller values than it. Returns how many nodes are great enough.
 *
 * Post-order, carry each subtree's `k` smallest values. A node is great
 * enough if its children's combined `k` smallest are all below it.
 *
 * @see https://leetcode.com/problems/count-nodes-that-are-great-enough/
 * @difficulty Hard
 * @timeComplexity O(n · k log k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * countNodesThatAreGreatEnough(treeFromArray([7, 6, 5, 4, 3, 2, 1]), 2); // 3
 */
export const countNodesThatAreGreatEnough = (
	root: TreeNode | null,
	k: number,
): number => {
	const smallest = new Map<TreeNode, number[]>();
	let great = 0;
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const below = [
			...(node.left ? (smallest.get(node.left) ?? []) : []),
			...(node.right ? (smallest.get(node.right) ?? []) : []),
		]
			.sort((a, b) => a - b)
			.slice(0, k);
		if (below.length === k && (below.at(-1) ?? 0) < node.val) great++;
		smallest.set(node, [...below, node.val].sort((a, b) => a - b).slice(0, k));
	}
	return great;
};
