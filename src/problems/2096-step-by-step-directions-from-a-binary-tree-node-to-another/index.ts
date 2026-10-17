import type { TreeNode } from "../../structures/tree-node";

/**
 * 2096. Step-By-Step Directions From a Binary Tree Node to Another
 *
 * Returns the shortest directions from the node valued `startValue` to the
 * node valued `destValue` as `"L"`, `"R"` and `"U"` (to the parent) moves.
 *
 * Find both nodes' paths from the root, drop their common prefix, then go
 * up for each remaining step of the start's path and follow the rest of
 * the destination's.
 *
 * @see https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * stepByStepDirectionsFromABinaryTreeNodeToAnother(treeFromArray([5, 1, 2, 3, null, 6, 4]), 3, 6); // "UURL"
 */
export const stepByStepDirectionsFromABinaryTreeNodeToAnother = (
	root: TreeNode | null,
	startValue: number,
	destValue: number,
): string => {
	const parents = new Map<TreeNode, [parent: TreeNode, step: string]>();
	const byValue = new Map<number, TreeNode>();
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		byValue.set(node.val, node);
		if (node.left) {
			parents.set(node.left, [node, "L"]);
			stack.push(node.left);
		}
		if (node.right) {
			parents.set(node.right, [node, "R"]);
			stack.push(node.right);
		}
	}
	const pathTo = (value: number): string[] => {
		const steps: string[] = [];
		const node = byValue.get(value);
		for (
			let entry = node && parents.get(node);
			entry;
			entry = parents.get(entry[0])
		)
			steps.push(entry[1]);
		return steps.reverse();
	};
	const [start, dest] = [pathTo(startValue), pathTo(destValue)];
	let common = 0;
	while (common < start.length && start[common] === dest[common]) common++;
	return "U".repeat(start.length - common) + dest.slice(common).join("");
};
