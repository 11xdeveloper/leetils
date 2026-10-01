import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { countCompleteTreeNodes } from ".";

describe("222. Count Complete Tree Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCompleteTreeNodes(treeFromArray([1, 2, 3, 4, 5, 6]))).toBe(6);
		expect(countCompleteTreeNodes(null)).toBe(0);
		expect(countCompleteTreeNodes(treeFromArray([1]))).toBe(1);
	});

	it("counts complete trees of every size up to 1000", () => {
		for (let n = 0; n <= 1000; n++) {
			const root = treeFromArray(Array.from({ length: n }, (_, i) => i));
			expect(countCompleteTreeNodes(root)).toBe(n);
		}
	});
});
