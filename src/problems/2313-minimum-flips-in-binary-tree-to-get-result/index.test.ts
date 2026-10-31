import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { minimumFlipsInBinaryTreeToGetResult as minimumFlips } from ".";

describe("2313. Minimum Flips in Binary Tree to Get Result", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumFlips(treeFromArray([3, 5, 4, 2, null, 1, 1, 1, 0]), true),
		).toBe(2);
		expect(minimumFlips(treeFromArray([0]), false)).toBe(0);
	});

	it("handles each operator", () => {
		expect(minimumFlips(treeFromArray([2, 0, 0]), true)).toBe(1);
		expect(minimumFlips(treeFromArray([3, 0, 0]), true)).toBe(2);
		expect(minimumFlips(treeFromArray([4, 1, 1]), true)).toBe(1);
		expect(minimumFlips(treeFromArray([5, null, 1]), true)).toBe(1);
	});
});
