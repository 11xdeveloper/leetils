import { describe, expect, it } from "bun:test";
import {
	TreeNodeWithRandom,
	treeWithRandomFromArray,
	treeWithRandomToArray,
} from "./tree-node-with-random";

describe("TreeNodeWithRandom", () => {
	it("defaults to a leaf holding 0 with no random pointer", () => {
		const node = new TreeNodeWithRandom();
		expect(node.val).toBe(0);
		expect(node.left).toBeNull();
		expect(node.right).toBeNull();
		expect(node.random).toBeNull();
	});
});

describe("treeWithRandomFromArray", () => {
	it("reads LeetCode's format, with random indices counting null slots", () => {
		const root = treeWithRandomFromArray([[1, null], null, [4, 3], [7, 0]]);
		expect(root?.val).toBe(1);
		expect(root?.left).toBeNull();
		expect(root?.right?.val).toBe(4);
		expect(root?.right?.left?.val).toBe(7);
		expect(root?.random).toBeNull();
		expect(root?.right?.random).toBe(root?.right?.left ?? null);
		expect(root?.right?.left?.random).toBe(root);
	});

	it("returns null for an empty array", () => {
		expect(treeWithRandomFromArray([])).toBeNull();
	});
});

describe("treeWithRandomToArray", () => {
	it("round-trips LeetCode's examples", () => {
		for (const entries of [
			[[1, null], null, [4, 3], [7, 0]],
			[[1, 4], null, [1, 0], null, [1, 5], [1, 5]],
			[
				[1, 6],
				[2, 5],
				[3, 4],
				[4, 3],
				[5, 2],
				[6, 1],
				[7, 0],
			],
		] as const) {
			expect(treeWithRandomToArray(treeWithRandomFromArray(entries))).toEqual(
				entries.map((entry) => (entry ? [...entry] : null)),
			);
		}
	});

	it("returns an empty array for an empty tree", () => {
		expect(treeWithRandomToArray(null)).toEqual([]);
	});
});
