import { describe, expect, it } from "bun:test";
import {
	type NaryTreeNode,
	naryTreeFromArray,
	naryTreeToArray,
} from "../../structures/nary-tree-node";
import { cloneNAryTree as cloneTree } from ".";

const nodesOf = (root: NaryTreeNode | null): NaryTreeNode[] =>
	root ? [root, ...root.children.flatMap(nodesOf)] : [];

describe("1490. Clone N-ary Tree", () => {
	it("solves the examples from the problem statement", () => {
		for (const values of [
			[1, null, 3, 2, 4, null, 5, 6],
			[
				1,
				null,
				2,
				3,
				4,
				5,
				null,
				null,
				6,
				7,
				null,
				8,
				null,
				9,
				10,
				null,
				null,
				11,
				null,
				12,
				null,
				13,
				null,
				null,
				14,
			],
		]) {
			const original = naryTreeFromArray(values);
			const copy = cloneTree(original);
			expect(naryTreeToArray(copy)).toEqual(values);
			const originals = new Set(nodesOf(original));
			for (const node of nodesOf(copy)) expect(originals.has(node)).toBeFalse();
		}
	});

	it("copies an empty tree and a deep chain", () => {
		expect(cloneTree(null)).toBeNull();
		const chain = [
			1,
			...Array.from({ length: 1000 }, (_, i) => [null, i + 2]).flat(),
		];
		expect(naryTreeToArray(cloneTree(naryTreeFromArray(chain)))).toEqual(chain);
	});
});
