import type { TreeNode } from "../../structures/tree-node";

/**
 * 549. Binary Tree Longest Consecutive Sequence II
 *
 * Returns the number of nodes on the longest path in a binary tree whose
 * values go up (or down) by exactly 1 at each step. The path can go through
 * a node from one child to the other.
 *
 * For each node, finds the longest path down from it that increases and
 * the longest that decreases, from its children's. A path through the
 * node joins a decreasing path down one side with an increasing one down
 * the other (counting the node once). Postorder with an explicit stack, so
 * deep trees don't overflow the call stack.
 *
 * @see https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeLongestConsecutiveSequenceII(treeFromArray([2, 1, 3])); // 3: 1 → 2 → 3
 */
export const binaryTreeLongestConsecutiveSequenceII = (
	root: TreeNode | null,
): number => {
	// Longest increasing and decreasing paths down from each node, counting the node.
	const runs = new Map<TreeNode, [increasing: number, decreasing: number]>();
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

		let increasing = 1;
		let decreasing = 1;
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			const [childIncreasing, childDecreasing] = runs.get(child) ?? [0, 0];
			if (child.val === node.val + 1)
				increasing = Math.max(increasing, childIncreasing + 1);
			if (child.val === node.val - 1)
				decreasing = Math.max(decreasing, childDecreasing + 1);
		}
		runs.set(node, [increasing, decreasing]);
		longest = Math.max(longest, increasing + decreasing - 1);
	}

	return longest;
};
