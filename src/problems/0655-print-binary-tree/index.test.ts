import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { printBinaryTree as printTree } from ".";

describe("655. Print Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(printTree(treeFromArray([1, 2]))).toEqual([
			["", "1", ""],
			["2", "", ""],
		]);
		expect(printTree(treeFromArray([1, 2, 3, null, 4]))).toEqual([
			["", "", "", "1", "", "", ""],
			["", "2", "", "", "", "3", ""],
			["", "", "4", "", "", "", ""],
		]);
	});

	it("handles a single node and negative values", () => {
		expect(printTree(treeFromArray([-5]))).toEqual([["-5"]]);
	});
});
