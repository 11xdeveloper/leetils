import type { TreeNode } from "../../structures/tree-node";

/**
 * 988. Smallest String Starting From Leaf
 *
 * Node values 0–25 stand for letters `a`–`z`. Returns the lexicographically
 * smallest string read from a leaf up to the root.
 *
 * Carries each node's string from the root down (prepending letters) with
 * an explicit stack, and compares the strings at the leaves.
 *
 * @see https://leetcode.com/problems/smallest-string-starting-from-leaf/
 * @difficulty Medium
 * @timeComplexity O(n · h) for the strings, where h is the height
 * @spaceComplexity O(n · h)
 *
 * @example
 * smallestStringStartingFromLeaf(treeFromArray([0, 1, 2, 3, 4, 3, 4])); // "dba"
 */
export const smallestStringStartingFromLeaf = (
	root: TreeNode | null,
): string => {
	let best: string | undefined;
	const stack: [TreeNode, string][] = root ? [[root, ""]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, below] = item;
		const text = String.fromCharCode(97 + node.val) + below;
		if (!node.left && !node.right) {
			if (best === undefined || text < best) best = text;
			continue;
		}
		if (node.left) stack.push([node.left, text]);
		if (node.right) stack.push([node.right, text]);
	}
	return best ?? "";
};
