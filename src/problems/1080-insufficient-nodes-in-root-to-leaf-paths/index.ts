import type { TreeNode } from "../../structures/tree-node";

/**
 * 1080. Insufficient Nodes in Root to Leaf Paths
 *
 * A node is insufficient if every root-to-leaf path through it sums to less
 * than `limit`. Deletes all insufficient nodes, in place, and returns the
 * root (or `null`).
 *
 * Passes path sums down with an explicit stack, then decides bottom-up: a
 * leaf survives if its path reaches `limit`, and any other node survives if
 * a child does. Children that don't survive are cut off.
 *
 * @see https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(insufficientNodesInRootToLeafPaths(treeFromArray([5, 4, 8, 11, null, 17, 4, 7, 1, null, null, 5, 3]), 22));
 * // [5, 4, 8, 11, null, 17, 4, 7, null, null, null, 5]
 */
export const insufficientNodesInRootToLeafPaths = (
	root: TreeNode | null,
	limit: number,
): TreeNode | null => {
	const survives = new Map<TreeNode, boolean>();
	const order: [TreeNode, number][] = [];
	const stack: [TreeNode, number][] = root ? [[root, root.val]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		order.push(item);
		const [node, sum] = item;
		if (node.left) stack.push([node.left, sum + node.left.val]);
		if (node.right) stack.push([node.right, sum + node.right.val]);
	}

	for (let i = order.length - 1; i >= 0; i--) {
		const [node, sum] = order[i] ?? [];
		if (!node || sum === undefined) continue;
		const isLeaf = !node.left && !node.right;
		if (node.left && !survives.get(node.left)) node.left = null;
		if (node.right && !survives.get(node.right)) node.right = null;
		survives.set(
			node,
			isLeaf ? sum >= limit : node.left !== null || node.right !== null,
		);
	}
	return root && survives.get(root) ? root : null;
};
