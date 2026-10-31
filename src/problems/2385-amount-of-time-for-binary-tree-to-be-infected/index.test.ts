import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { amountOfTimeForBinaryTreeToBeInfected as amountOfTime } from ".";

describe("2385. Amount of Time for Binary Tree to Be Infected", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			amountOfTime(treeFromArray([1, 5, 3, null, 4, 10, 6, 9, 2]), 3),
		).toBe(4);
		expect(amountOfTime(treeFromArray([1]), 1)).toBe(0);
	});
});
