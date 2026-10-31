import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { findTheLevelOfTreeWithMinimumSum as minimumLevel } from ".";

describe("3157. Find the Level of Tree with Minimum Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumLevel(treeFromArray([50, 6, 2, 30, 80, 7]))).toBe(2);
		expect(minimumLevel(treeFromArray([36, 17, 10, null, null, 24]))).toBe(3);
		expect(minimumLevel(treeFromArray([5, null, 5, null, 5]))).toBe(1);
	});
});
