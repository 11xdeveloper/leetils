import type { TreeNode } from "../../structures/tree-node";

/**
 * 979. Distribute Coins in Binary Tree
 *
 * Each node holds `val` coins, with as many coins in total as nodes. A move
 * shifts one coin between neighbouring nodes. Returns the fewest moves to
 * give every node exactly one coin.
 *
 * Each subtree has a surplus or deficit of `coins - nodes`, and that many
 * coins must cross the edge above it. Summing those amounts over every
 * edge gives the answer. Postorder with an explicit stack.
 *
 * @see https://leetcode.com/problems/distribute-coins-in-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * distributeCoinsInBinaryTree(treeFromArray([0, 3, 0])); // 3
 */
export const distributeCoinsInBinaryTree = (root: TreeNode | null): number => {
	const excess = new Map<TreeNode | null, number>([[null, 0]]);
	let moves = 0;
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const [left, right] = [
			excess.get(node.left) ?? 0,
			excess.get(node.right) ?? 0,
		];
		moves += Math.abs(left) + Math.abs(right);
		excess.set(node, node.val - 1 + left + right);
	}
	return moves;
};
