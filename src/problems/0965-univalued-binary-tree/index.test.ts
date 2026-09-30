import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { univaluedBinaryTree as isUnivalTree } from ".";

describe("965. Univalued Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(isUnivalTree(treeFromArray([1, 1, 1, 1, 1, null, 1]))).toBeTrue();
		expect(isUnivalTree(treeFromArray([2, 2, 2, 5, 2]))).toBeFalse();
	});
});
