import type { TreeNode } from "../../structures/tree-node";

/**
 * 2313. Minimum Flips in Binary Tree to Get Result
 *
 * Leaves hold 0 (false) or 1 (true); internal nodes are 2 (OR), 3 (AND),
 * 4 (XOR) or 5 (NOT, one child). A flip negates a leaf. Returns the fewest
 * flips for the tree to evaluate to `result`.
 *
 * Post-order (explicit stack): each node's cheapest way to be false and
 * to be true, combining its children's per operator.
 *
 * @see https://leetcode.com/problems/minimum-flips-in-binary-tree-to-get-result/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumFlipsInBinaryTreeToGetResult(treeFromArray([3, 5, 4, 2, null, 1, 1, 1, 0]), true); // 2
 */
export const minimumFlipsInBinaryTreeToGetResult = (
	root: TreeNode | null,
	result: boolean,
): number => {
	const costs = new Map<TreeNode, [toFalse: number, toTrue: number]>();
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, visited] = entry;
		if (!visited) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		if (node.val <= 1) {
			costs.set(node, node.val ? [1, 0] : [0, 1]);
			continue;
		}
		const children = [node.left, node.right].flatMap(
			(child): [number, number][] =>
				child ? [costs.get(child) ?? [0, 0]] : [],
		);
		const [first, second] = children;
		const [aFalse, aTrue] = first ?? [0, 0];
		const [bFalse, bTrue] = second ?? [0, 0];
		switch (node.val) {
			case 2:
				costs.set(node, [
					aFalse + bFalse,
					Math.min(aTrue + bFalse, aFalse + bTrue, aTrue + bTrue),
				]);
				break;
			case 3:
				costs.set(node, [
					Math.min(aFalse + bTrue, aTrue + bFalse, aFalse + bFalse),
					aTrue + bTrue,
				]);
				break;
			case 4:
				costs.set(node, [
					Math.min(aFalse + bFalse, aTrue + bTrue),
					Math.min(aFalse + bTrue, aTrue + bFalse),
				]);
				break;
			default:
				costs.set(node, [aTrue, aFalse]);
		}
	}
	const [toFalse, toTrue] = (root && costs.get(root)) ?? [0, 0];
	return result ? toTrue : toFalse;
};
