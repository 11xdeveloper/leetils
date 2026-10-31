import { describe, expect, it } from "bun:test";
import { isArrayAPreorderOfSomeBinaryTree as isPreorder } from ".";

describe("2764. Is Array a Preorder of Some ‌Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isPreorder([
				[0, -1],
				[1, 0],
				[2, 0],
				[3, 2],
				[4, 2],
			]),
		).toBe(true);
		expect(
			isPreorder([
				[0, -1],
				[1, 0],
				[2, 0],
				[3, 1],
				[4, 1],
			]),
		).toBe(false);
	});

	it("accepts a lone root", () => {
		expect(isPreorder([[0, -1]])).toBe(true);
	});
});
