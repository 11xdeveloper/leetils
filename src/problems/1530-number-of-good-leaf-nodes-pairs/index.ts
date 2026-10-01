import type { TreeNode } from "../../structures/tree-node";

/**
 * 1530. Number of Good Leaf Nodes Pairs
 *
 * Counts the pairs of leaves at most `distance` edges apart.
 *
 * Bottom-up, each node reports how many leaves lie at each depth below it
 * (up to `distance`). At a node, pairs with one leaf in each child's
 * subtree are counted by combining those tallies. Reverse preorder visits
 * children first.
 *
 * @see https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/
 * @difficulty Medium
 * @timeComplexity O(n · distance^2)
 * @spaceComplexity O(n · distance)
 *
 * @example
 * numberOfGoodLeafNodesPairs(treeFromArray([1, 2, 3, 4, 5, 6, 7]), 3); // 2
 */
export const numberOfGoodLeafNodesPairs = (
	root: TreeNode | null,
	distance: number,
): number => {
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	// leaves.get(node)[d] counts leaves d edges below node.
	const leaves = new Map<TreeNode, number[]>();
	let pairs = 0;
	for (const node of order.reverse()) {
		const counts = new Array<number>(distance + 1).fill(0);
		if (!node.left && !node.right) {
			counts[0] = 1;
			leaves.set(node, counts);
			continue;
		}
		const [left, right] = [
			node.left && leaves.get(node.left),
			node.right && leaves.get(node.right),
		];
		if (left && right) {
			for (let a = 0; a < distance; a++) {
				for (let b = 0; a + b + 2 <= distance; b++)
					pairs += (left[a] ?? 0) * (right[b] ?? 0);
			}
		}
		for (const child of [left, right]) {
			for (let d = 0; d < distance && child; d++)
				counts[d + 1] = (counts[d + 1] ?? 0) + (child[d] ?? 0);
		}
		leaves.set(node, counts);
	}
	return pairs;
};
