import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { evaluateBooleanBinaryTree as evaluateTree } from ".";

describe("2331. Evaluate Boolean Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(evaluateTree(treeFromArray([2, 1, 3, null, null, 0, 1]))).toBeTrue();
		expect(evaluateTree(treeFromArray([0]))).toBeFalse();
	});
});
