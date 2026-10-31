import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { stepByStepDirectionsFromABinaryTreeNodeToAnother as getDirections } from ".";

describe("2096. Step-By-Step Directions From a Binary Tree Node to Another", () => {
	it("solves the examples from the problem statement", () => {
		const root = treeFromArray([5, 1, 2, 3, null, 6, 4]);
		expect(getDirections(root, 3, 6)).toBe("UURL");
		expect(getDirections(treeFromArray([2, 1]), 2, 1)).toBe("L");
	});

	it("goes straight up or down when one node is an ancestor", () => {
		const root = treeFromArray([1, 2, 3, 4, 5, 6, 7]);
		expect(getDirections(root, 5, 1)).toBe("UU");
		expect(getDirections(root, 3, 6)).toBe("L");
		expect(getDirections(root, 4, 5)).toBe("UR");
	});
});
