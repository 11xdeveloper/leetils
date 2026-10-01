import type { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 1522. Diameter of N-Ary Tree
 *
 * Returns the number of edges on the longest path between two nodes of an
 * N-ary tree.
 *
 * Bottom-up, each node's height is one more than its tallest child, and
 * the longest path through it joins its two tallest children. Reverse
 * preorder visits children first.
 *
 * @see https://leetcode.com/problems/diameter-of-n-ary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * diameterOfNAryTree(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])); // 3
 */
export const diameterOfNAryTree = (root: NaryTreeNode | null): number => {
	const order: NaryTreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		stack.push(...node.children);
	}
	const height = new Map<NaryTreeNode, number>();
	let diameter = 0;
	for (const node of order.reverse()) {
		let [tallest, second] = [0, 0];
		for (const child of node.children) {
			const h = (height.get(child) ?? 0) + 1;
			if (h > tallest) [tallest, second] = [h, tallest];
			else if (h > second) second = h;
		}
		height.set(node, tallest);
		diameter = Math.max(diameter, tallest + second);
	}
	return diameter;
};
