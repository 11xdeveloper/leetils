import { describe, expect, it } from "bun:test";
import { TreeNode, treeToArray } from "../../structures/tree-node";
import {
	type TreeNodeWithParent,
	treeWithParentFromArray,
} from "../../structures/tree-node-with-parent";
import { changeTheRootOfABinaryTree as flipBinaryTree } from ".";

const nodesOf = (root: TreeNodeWithParent | null): TreeNodeWithParent[] => {
	const nodes: TreeNodeWithParent[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		nodes.push(node);
		if (node.right) stack.push(node.right);
		if (node.left) stack.push(node.left);
	}
	return nodes;
};

/** Copies the tree into plain nodes, checking every parent pointer on the way. */
const toPlain = (
	node: TreeNodeWithParent | null,
	parent: TreeNodeWithParent | null,
): TreeNode | null => {
	if (!node) return null;
	expect(node.parent).toBe(parent);
	return new TreeNode(
		node.val,
		toPlain(node.left, node),
		toPlain(node.right, node),
	);
};

const reroot = (values: (number | null)[], leafValue: number) => {
	const root = treeWithParentFromArray(values);
	const leaf = nodesOf(root).find((node) => node.val === leafValue);
	if (!root || !leaf) throw new Error("bad input");
	return treeToArray(toPlain(flipBinaryTree(root, leaf), null));
};

describe("1666. Change the Root of a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(reroot([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7)).toEqual([
			7,
			2,
			null,
			5,
			4,
			3,
			6,
			null,
			null,
			null,
			1,
			null,
			null,
			0,
			8,
		]);
		expect(reroot([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 0)).toEqual([
			0,
			1,
			null,
			3,
			8,
			5,
			null,
			null,
			null,
			6,
			2,
			null,
			null,
			7,
			4,
		]);
	});

	it("handles a two-node tree", () => {
		expect(reroot([1, 2], 2)).toEqual([2, 1]);
		expect(reroot([1, null, 2], 2)).toEqual([2, 1]);
	});

	it("keeps every node and makes the leaf's old path its left spine", () => {
		const root = treeWithParentFromArray([
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			null,
			8,
			9,
			null,
			null,
			10,
		]);
		const leaf = nodesOf(root).find((node) => node.val === 8);
		if (!root || !leaf) throw new Error("bad input");
		const newRoot = flipBinaryTree(root, leaf);
		expect(nodesOf(newRoot).length).toBe(10);
		const spine: number[] = [];
		for (let node: TreeNodeWithParent | null = newRoot; node; node = node.left)
			spine.push(node.val);
		expect(spine.slice(0, 4)).toEqual([8, 4, 2, 1]);
		toPlain(newRoot, null);
	});
});
