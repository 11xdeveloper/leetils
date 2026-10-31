import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { reverseOddLevelsOfBinaryTree as reverseOddLevels } from ".";

const reverse = (values: number[]): (number | null)[] =>
	treeToArray(reverseOddLevels(treeFromArray(values)));

describe("2415. Reverse Odd Levels of Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverse([2, 3, 5, 8, 13, 21, 34])).toEqual([2, 5, 3, 8, 13, 21, 34]);
		expect(reverse([7, 13, 11])).toEqual([7, 11, 13]);
		expect(reverse([0, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2])).toEqual([
			0, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1,
		]);
	});
});
