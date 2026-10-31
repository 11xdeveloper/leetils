import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { countNodesEqualToAverageOfSubtree as averageOfSubtree } from ".";

describe("2265. Count Nodes Equal to Average of Subtree", () => {
	it("solves the examples from the problem statement", () => {
		expect(averageOfSubtree(treeFromArray([4, 8, 5, 0, 1, null, 6]))).toBe(5);
		expect(averageOfSubtree(treeFromArray([1]))).toBe(1);
	});
});
