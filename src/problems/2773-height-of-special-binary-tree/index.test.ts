import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { heightOfSpecialBinaryTree as heightOfTree } from ".";

/** Builds a tree and links its leaves, left to right, into a cycle. */
const special = (values: (number | null)[]): TreeNode | null => {
	const root = treeFromArray(values);
	const leaves: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (!node.left && !node.right) leaves.push(node);
		if (node.right) stack.push(node.right);
		if (node.left) stack.push(node.left);
	}
	for (const [i, leaf] of leaves.entries()) {
		leaf.right = leaves[(i + 1) % leaves.length] ?? null;
		leaf.left = leaves[(i + leaves.length - 1) % leaves.length] ?? null;
	}
	return root;
};

describe("2773. Height of Special Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(heightOfTree(special([1, 2, 3, 4, 5]))).toBe(2);
		expect(heightOfTree(special([1, 2]))).toBe(1);
		expect(heightOfTree(special([1, 2, 3, null, null, 4, null, 5, 6]))).toBe(3);
	});
});
