import { describe, expect, it } from "bun:test";
import { treeToArray } from "../../structures/tree-node";
import { inorderValues, nodesOf } from "../../testing/trees";
import { uniqueBinarySearchTreesII } from ".";

// The Catalan numbers: how many binary search trees hold n values.
const CATALAN = [1, 1, 2, 5, 14, 42, 132, 429, 1430];

describe("95. Unique Binary Search Trees II", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniqueBinarySearchTreesII(3).map(treeToArray)).toEqual([
			[1, null, 2, null, 3],
			[1, null, 3, 2],
			[2, 1, 3],
			[3, 1, null, null, 2],
			[3, 2, null, 1],
		]);
		expect(uniqueBinarySearchTreesII(1).map(treeToArray)).toEqual([[1]]);
	});

	it("returns every distinct binary search tree, up to the constraint of 8 values", () => {
		for (let n = 1; n <= 8; n++) {
			const trees = uniqueBinarySearchTreesII(n);
			expect(trees).toHaveLength(CATALAN[n] ?? 0);
			expect(
				new Set(trees.map((tree) => JSON.stringify(treeToArray(tree)))).size,
			).toBe(trees.length);
			const expected = Array.from({ length: n }, (_, i) => i + 1);
			for (const tree of trees) expect(inorderValues(tree)).toEqual(expected);
		}
	});

	it("never shares nodes between trees", () => {
		const trees = uniqueBinarySearchTreesII(5);
		const all = trees.flatMap(nodesOf);
		expect(new Set(all).size).toBe(all.length);
	});
});
