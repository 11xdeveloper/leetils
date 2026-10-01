import type { TreeNode } from "../../structures/tree-node";

/**
 * 865. Smallest Subtree with all the Deepest Nodes
 *
 * Returns the root of the smallest subtree containing every deepest node
 * of a binary tree, which is their lowest common ancestor.
 *
 * In postorder, each node learns the depth of its deepest descendant and
 * the answer for its subtree: if both children reach equally deep it's the
 * node itself, otherwise it's the deeper child's answer. An explicit stack
 * keeps deep trees from overflowing the call stack.
 *
 * @see https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(smallestSubtreeWithAllTheDeepestNodes(treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]))); // [2, 7, 4]
 */
export const smallestSubtreeWithAllTheDeepestNodes = (
	root: TreeNode | null,
): TreeNode | null => {
	const result = new Map<
		TreeNode | null,
		[height: number, answer: TreeNode | null]
	>([[null, [0, null]]]);
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const [leftHeight, leftAnswer] = result.get(node.left) ?? [0, null];
		const [rightHeight, rightAnswer] = result.get(node.right) ?? [0, null];
		if (leftHeight === rightHeight) result.set(node, [leftHeight + 1, node]);
		else if (leftHeight > rightHeight)
			result.set(node, [leftHeight + 1, leftAnswer]);
		else result.set(node, [rightHeight + 1, rightAnswer]);
	}
	return result.get(root)?.[1] ?? null;
};
