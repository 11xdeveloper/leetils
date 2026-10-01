import type { TreeNode } from "../../structures/tree-node";

/**
 * 1120. Maximum Average Subtree
 *
 * Returns the largest average of the values in any subtree (a node and all
 * its descendants).
 *
 * Works out each subtree's sum and size bottom-up, visiting nodes in reverse
 * preorder so children come before their parent.
 *
 * @see https://leetcode.com/problems/maximum-average-subtree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumAverageSubtree(treeFromArray([5, 6, 1])); // 6
 */
export const maximumAverageSubtree = (root: TreeNode | null): number => {
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	const totals = new Map<TreeNode, [sum: number, size: number]>();
	let best = 0;
	for (const node of order.reverse()) {
		const [leftSum, leftSize] = (node.left && totals.get(node.left)) || [0, 0];
		const [rightSum, rightSize] = (node.right && totals.get(node.right)) || [
			0, 0,
		];
		const sum = node.val + leftSum + rightSum;
		const size = 1 + leftSize + rightSize;
		totals.set(node, [sum, size]);
		best = Math.max(best, sum / size);
	}
	return best;
};
