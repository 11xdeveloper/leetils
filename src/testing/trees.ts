import { TreeNode } from "../structures/tree-node";
import type { Random } from "./random";

/** Inserts values into a binary search tree in order, skipping duplicates. */
export const bstFromValues = (values: readonly number[]): TreeNode | null => {
	let root: TreeNode | null = null;
	for (const value of values) {
		const node = new TreeNode(value);
		if (!root) {
			root = node;
			continue;
		}
		let current = root;
		for (;;) {
			if (value === current.val) break;
			const side = value < current.val ? "left" : "right";
			const child = current[side];
			if (!child) {
				current[side] = node;
				break;
			}
			current = child;
		}
	}
	return root;
};

/** A random binary tree with up to `maxSize` nodes and values in [min, max]. */
export const randomTree = (
	random: Random,
	maxSize: number,
	min: number,
	max: number,
): TreeNode | null => {
	const size = random.int(0, maxSize);
	if (size === 0) return null;
	const root = new TreeNode(random.int(min, max));
	const nodes = [root];
	while (nodes.length < size) {
		const parent = nodes[random.int(0, nodes.length - 1)];
		if (!parent) break;
		const side = random.int(0, 1) === 0 ? "left" : "right";
		if (parent[side]) continue;
		const child = new TreeNode(random.int(min, max));
		parent[side] = child;
		nodes.push(child);
	}
	return root;
};

/** Every node in the tree, in preorder. */
export const nodesOf = (root: TreeNode | null): TreeNode[] =>
	root ? [root, ...nodesOf(root.left), ...nodesOf(root.right)] : [];

/** Values in inorder (left, node, right). */
export const inorderValues = (root: TreeNode | null): number[] =>
	root
		? [...inorderValues(root.left), root.val, ...inorderValues(root.right)]
		: [];
