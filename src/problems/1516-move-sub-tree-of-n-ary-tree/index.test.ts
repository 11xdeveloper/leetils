import { describe, expect, it } from "bun:test";
import {
	type NaryTreeNode,
	naryTreeFromArray,
	naryTreeToArray,
} from "../../structures/nary-tree-node";
import { moveSubTreeOfNAryTree as moveSubTree } from ".";

const find = (root: NaryTreeNode | null, val: number): NaryTreeNode => {
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val === val) return node;
		stack.push(...node.children);
	}
	throw new Error(`no node ${val}`);
};

const move = (values: (number | null)[], p: number, q: number) => {
	const root = naryTreeFromArray(values);
	return naryTreeToArray(moveSubTree(root, find(root, p), find(root, q)));
};

describe("1516. Move Sub-Tree of N-Ary Tree", () => {
	const tree = [1, null, 2, 3, null, 4, 5, null, 6, null, 7, 8];

	it("solves the examples from the problem statement", () => {
		expect(move(tree, 4, 1)).toEqual([
			1,
			null,
			2,
			3,
			4,
			null,
			5,
			null,
			6,
			null,
			7,
			8,
		]);
		expect(move(tree, 7, 4)).toEqual([
			1,
			null,
			2,
			3,
			null,
			4,
			5,
			null,
			6,
			null,
			7,
			8,
		]);
		expect(move(tree, 3, 8)).toEqual([
			1,
			null,
			2,
			null,
			4,
			5,
			null,
			7,
			8,
			null,
			null,
			null,
			3,
			null,
			6,
		]);
		expect(move([1, null, 2, 3, null, 4], 1, 4)).toEqual([
			4,
			null,
			1,
			null,
			2,
			3,
		]);
	});

	it("moves a subtree beside its sibling", () => {
		expect(move([1, null, 2, 3], 2, 3)).toEqual([1, null, 3, null, 2]);
	});
});
