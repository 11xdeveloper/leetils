import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { leafSimilarTrees as leafSimilar } from ".";

describe("872. Leaf-Similar Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			leafSimilar(
				treeFromArray([3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]),
				treeFromArray([
					3,
					5,
					1,
					6,
					7,
					4,
					2,
					null,
					null,
					null,
					null,
					null,
					null,
					9,
					8,
				]),
			),
		).toBeTrue();
		expect(
			leafSimilar(treeFromArray([1, 2, 3]), treeFromArray([1, 3, 2])),
		).toBeFalse();
	});

	it("doesn't confuse multi-digit leaves", () => {
		expect(
			leafSimilar(treeFromArray([0, 1, 23]), treeFromArray([0, 12, 3])),
		).toBeFalse();
	});
});
