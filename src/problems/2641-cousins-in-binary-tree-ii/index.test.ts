import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { cousinsInBinaryTreeII as replaceValueInTree } from ".";

describe("2641. Cousins in Binary Tree II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(replaceValueInTree(treeFromArray([5, 4, 9, 1, 10, null, 7]))),
		).toEqual([0, 0, 0, 7, 7, null, 11]);
		expect(treeToArray(replaceValueInTree(treeFromArray([3, 1, 2])))).toEqual([
			0, 0, 0,
		]);
	});
});
