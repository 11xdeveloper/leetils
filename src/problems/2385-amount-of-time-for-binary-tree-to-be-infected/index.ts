import type { TreeNode } from "../../structures/tree-node";

/**
 * 2385. Amount of Time for Binary Tree to Be Infected
 *
 * An infection starts at the node valued `start` and spreads to adjacent
 * nodes each minute. Returns the minutes until the whole tree is infected.
 *
 * Record parents, then search breadth-first from the start node.
 *
 * @see https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * amountOfTimeForBinaryTreeToBeInfected(treeFromArray([1, 5, 3, null, 4, 10, 6, 9, 2]), 3); // 4
 */
export const amountOfTimeForBinaryTreeToBeInfected = (
	root: TreeNode | null,
	start: number,
): number => {
	const parent = new Map<TreeNode, TreeNode>();
	let source: TreeNode | undefined;
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val === start) source = node;
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			parent.set(child, node);
			stack.push(child);
		}
	}
	if (!source) return 0;
	const seen = new Set([source]);
	let level = [source];
	let minutes = -1;
	while (level.length) {
		minutes++;
		const next: TreeNode[] = [];
		for (const node of level) {
			for (const neighbour of [node.left, node.right, parent.get(node)]) {
				if (!neighbour || seen.has(neighbour)) continue;
				seen.add(neighbour);
				next.push(neighbour);
			}
		}
		level = next;
	}
	return minutes;
};
