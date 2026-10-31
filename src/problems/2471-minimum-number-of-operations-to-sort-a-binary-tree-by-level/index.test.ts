import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { minimumNumberOfOperationsToSortABinaryTreeByLevel as minimumOperations } from ".";

describe("2471. Minimum Number of Operations to Sort a Binary Tree by Level", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumOperations(
				treeFromArray([
					1,
					4,
					3,
					7,
					6,
					8,
					5,
					null,
					null,
					null,
					null,
					9,
					null,
					10,
				]),
			),
		).toBe(3);
		expect(minimumOperations(treeFromArray([1, 3, 2, 7, 6, 5, 4]))).toBe(3);
		expect(minimumOperations(treeFromArray([1, 2, 3, 4, 5, 6]))).toBe(0);
	});
});
