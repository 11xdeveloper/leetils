import { describe, expect, it } from "bun:test";
import { makeCostsOfPathsEqualInABinaryTree as minIncrements } from ".";

describe("2673. Make Costs of Paths Equal in a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(minIncrements(7, [1, 5, 2, 2, 3, 3, 1])).toBe(6);
		expect(minIncrements(3, [5, 3, 3])).toBe(0);
	});
});
