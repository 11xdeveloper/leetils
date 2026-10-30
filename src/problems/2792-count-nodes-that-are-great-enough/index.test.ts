import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { countNodesThatAreGreatEnough as countGreatEnoughNodes } from ".";

describe("2792. Count Nodes That Are Great Enough", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGreatEnoughNodes(treeFromArray([7, 6, 5, 4, 3, 2, 1]), 2)).toBe(
			3,
		);
		expect(countGreatEnoughNodes(treeFromArray([1, 2, 3]), 1)).toBe(0);
		expect(countGreatEnoughNodes(treeFromArray([3, 2, 2]), 2)).toBe(1);
	});
});
