import type { TreeNode } from "../../structures/tree-node";

/**
 * 652. Find Duplicate Subtrees
 *
 * Returns one root of each kind of subtree that appears more than once in
 * a binary tree (same structure and values).
 *
 * Gives each distinct subtree shape an ID, built in postorder from the node's
 * value and its children's IDs, so comparing subtrees is comparing IDs. The
 * second time an ID appears, that node is recorded. It uses an explicit
 * stack, so deep trees don't overflow the call stack.
 *
 * @see https://leetcode.com/problems/find-duplicate-subtrees/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findDuplicateSubtrees(treeFromArray([1, 2, 3, 4, null, 2, 4, null, null, 4])); // the subtrees [2, 4] and [4]
 */
export const findDuplicateSubtrees = (
	root: TreeNode | null,
): (TreeNode | null)[] => {
	const idOfShape = new Map<string, number>();
	const seen = new Map<number, number>();
	const idOfNode = new Map<TreeNode | null, number>([[null, 0]]);
	const duplicates: TreeNode[] = [];
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.right) stack.push([node.right, false]);
			if (node.left) stack.push([node.left, false]);
			continue;
		}
		const shape = `${idOfNode.get(node.left)},${node.val},${idOfNode.get(node.right)}`;
		let id = idOfShape.get(shape);
		if (id === undefined) {
			id = idOfShape.size + 1;
			idOfShape.set(shape, id);
		}
		idOfNode.set(node, id);
		const count = (seen.get(id) ?? 0) + 1;
		seen.set(id, count);
		if (count === 2) duplicates.push(node);
	}

	return duplicates;
};
