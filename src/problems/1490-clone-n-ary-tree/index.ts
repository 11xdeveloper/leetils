import { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 1490. Clone N-ary Tree
 *
 * Returns a deep copy of an N-ary tree.
 *
 * Copies nodes with an explicit stack, pairing each original with its copy
 * and filling in copies of the children.
 *
 * @see https://leetcode.com/problems/clone-n-ary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * naryTreeToArray(cloneNAryTree(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6]))); // [1, null, 3, 2, 4, null, 5, 6]
 */
export const cloneNAryTree = (
	root: NaryTreeNode | null,
): NaryTreeNode | null => {
	if (!root) return null;
	const copy = new NaryTreeNode(root.val);
	const stack: [NaryTreeNode, NaryTreeNode][] = [[root, copy]];
	for (let pair = stack.pop(); pair; pair = stack.pop()) {
		const [original, clone] = pair;
		clone.children = original.children.map((child) => {
			const childCopy = new NaryTreeNode(child.val);
			stack.push([child, childCopy]);
			return childCopy;
		});
	}
	return copy;
};
