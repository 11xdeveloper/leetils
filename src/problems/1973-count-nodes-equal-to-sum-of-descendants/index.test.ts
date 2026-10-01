import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { countNodesEqualToSumOfDescendants as equalToDescendants } from ".";

describe("1973. Count Nodes Equal to Sum of Descendants", () => {
	it("solves the examples from the problem statement", () => {
		expect(equalToDescendants(treeFromArray([10, 3, 4, 2, 1]))).toBe(2);
		expect(equalToDescendants(treeFromArray([2, 3, null, 2, null]))).toBe(0);
		expect(equalToDescendants(treeFromArray([0]))).toBe(1);
	});
});
