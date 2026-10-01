import type { TreeNode } from "../../structures/tree-node";

/**
 * 951. Flip Equivalent Binary Trees
 *
 * A flip swaps a node's left and right subtrees. Returns whether some
 * sequence of flips turns `root1` into `root2`. Values are unique within
 * each tree.
 *
 * Two nodes match if their values are equal and their children match
 * either straight or crossed. Checked with an explicit stack of node pairs,
 * choosing the pairing by the children's values, which is safe because
 * values are unique.
 *
 * @see https://leetcode.com/problems/flip-equivalent-binary-trees/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * flipEquivalentBinaryTrees(treeFromArray([1, 2, 3]), treeFromArray([1, 3, 2])); // true
 */
export const flipEquivalentBinaryTrees = (
	root1: TreeNode | null,
	root2: TreeNode | null,
): boolean => {
	const stack: [TreeNode | null, TreeNode | null][] = [[root1, root2]];
	for (let pair = stack.pop(); pair; pair = stack.pop()) {
		const [a, b] = pair;
		if (!a || !b) {
			if (a !== b) return false;
			continue;
		}
		if (a.val !== b.val) return false;
		const straight =
			(a.left?.val ?? null) === (b.left?.val ?? null) &&
			(a.right?.val ?? null) === (b.right?.val ?? null);
		if (straight) stack.push([a.left, b.left], [a.right, b.right]);
		else stack.push([a.left, b.right], [a.right, b.left]);
	}
	return true;
};
