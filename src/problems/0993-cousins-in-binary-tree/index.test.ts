import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { cousinsInBinaryTree as isCousins } from ".";

describe("993. Cousins in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(isCousins(treeFromArray([1, 2, 3, 4]), 4, 3)).toBeFalse();
		expect(
			isCousins(treeFromArray([1, 2, 3, null, 4, null, 5]), 5, 4),
		).toBeTrue();
		expect(isCousins(treeFromArray([1, 2, 3, null, 4]), 2, 3)).toBeFalse();
	});
});
