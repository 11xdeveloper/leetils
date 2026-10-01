import type { TreeNode } from "../../structures/tree-node";

/**
 * 687. Longest Univalue Path
 *
 * Returns the length, in edges, of the longest path in a binary tree whose
 * nodes all have the same value. The path need not pass through the root.
 *
 * For each node, the longest same-valued path going down from it extends
 * a child's path when the child has the same value. The longest path
 * through the node joins its two sides. Postorder with an explicit stack,
 * so deep trees don't overflow the call stack.
 *
 * @see https://leetcode.com/problems/longest-univalue-path/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestUnivaluePath(treeFromArray([5, 4, 5, 1, 1, null, 5])); // 2
 */
export const longestUnivaluePath = (root: TreeNode | null): number => {
	const down = new Map<TreeNode, number>();
	let longest = 0;
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const side = (child: TreeNode | null): number =>
			child && child.val === node.val ? (down.get(child) ?? 0) + 1 : 0;
		const left = side(node.left);
		const right = side(node.right);
		longest = Math.max(longest, left + right);
		down.set(node, Math.max(left, right));
	}

	return longest;
};
