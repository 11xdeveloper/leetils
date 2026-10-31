import type { TreeNode } from "../../structures/tree-node";

/**
 * 2458. Height of Binary Tree After Subtree Removal Queries
 *
 * Each query removes the subtree rooted at a node (values are distinct)
 * and asks for the tree's height, independently of other queries.
 *
 * In a pre-order listing every subtree is a contiguous block, so the
 * height without it is the deepest node before or after the block:
 * prefix and suffix maximums of depth.
 *
 * @see https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/
 * @difficulty Hard
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * heightOfBinaryTreeAfterSubtreeRemovalQueries(treeFromArray([1, 3, 4, 2, null, 6, 5, null, null, null, null, null, 7]), [4]); // [2]
 */
export const heightOfBinaryTreeAfterSubtreeRemovalQueries = (
	root: TreeNode | null,
	queries: readonly number[],
): number[] => {
	const depths: number[] = [];
	const start = new Map<number, number>();
	const size = new Map<number, number>();
	const stack: [TreeNode, number, boolean][] = root ? [[root, 0, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, depth, visited] = entry;
		if (visited) {
			size.set(node.val, depths.length - (start.get(node.val) ?? 0));
			continue;
		}
		start.set(node.val, depths.length);
		depths.push(depth);
		stack.push([node, depth, true]);
		if (node.right) stack.push([node.right, depth + 1, false]);
		if (node.left) stack.push([node.left, depth + 1, false]);
	}
	const n = depths.length;
	const before = new Array<number>(n + 1).fill(0);
	const after = new Array<number>(n + 1).fill(0);
	for (let i = 0; i < n; i++)
		before[i + 1] = Math.max(before[i] ?? 0, depths[i] ?? 0);
	for (let i = n - 1; i >= 0; i--)
		after[i] = Math.max(after[i + 1] ?? 0, depths[i] ?? 0);
	return queries.map((value) => {
		const from = start.get(value) ?? 0;
		return Math.max(
			before[from] ?? 0,
			after[from + (size.get(value) ?? 0)] ?? 0,
		);
	});
};
