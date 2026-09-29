import { describe, expect, it } from "bun:test";
import {
	NaryTreeNode,
	naryTreeFromArray,
	naryTreeToArray,
} from "./nary-tree-node";

describe("NaryTreeNode", () => {
	it("defaults to a leaf holding 0", () => {
		const node = new NaryTreeNode();
		expect(node.val).toBe(0);
		expect(node.children).toEqual([]);
	});
});

describe("naryTreeFromArray", () => {
	it("reads LeetCode's level-order format", () => {
		const root = naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6]);
		expect(root?.children.map((c) => c.val)).toEqual([3, 2, 4]);
		expect(root?.children[0]?.children.map((c) => c.val)).toEqual([5, 6]);
		expect(root?.children[1]?.children).toEqual([]);
	});

	it("returns null for an empty array", () => {
		expect(naryTreeFromArray([])).toBeNull();
	});
});

describe("naryTreeToArray", () => {
	it("round-trips with naryTreeFromArray", () => {
		for (const values of [
			[],
			[1],
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
			expect(naryTreeToArray(naryTreeFromArray(values))).toEqual(values);
		}
	});
});
