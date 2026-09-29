import type { TreeNode } from "../../structures/tree-node";

/**
 * 337. House Robber III
 *
 * Houses form a binary tree, each holding some money. Returns the most money
 * that can be taken without taking from two houses directly linked as parent
 * and child.
 *
 * For each node, the best total of its subtree both with and without taking
 * it: taking it rules out its children, and skipping it allows the better
 * choice for each child. Visits children before parents (postorder) with an
 * explicit stack, so deep trees can't overflow the call stack.
 *
 * @see https://leetcode.com/problems/house-robber-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * houseRobberIII(treeFromArray([3, 2, 3, null, 3, null, 1])); // 7: 3 + 3 + 1
 */
export const houseRobberIII = (root: TreeNode | null): number => {
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	const best = new Map<TreeNode, [take: number, skip: number]>();
	for (const node of order.reverse()) {
		const [leftTake, leftSkip] = (node.left && best.get(node.left)) || [0, 0];
		const [rightTake, rightSkip] = (node.right && best.get(node.right)) || [
			0, 0,
		];
		best.set(node, [
			node.val + leftSkip + rightSkip,
			Math.max(leftTake, leftSkip) + Math.max(rightTake, rightSkip),
		]);
	}

	return root ? Math.max(...(best.get(root) ?? [0])) : 0;
};
