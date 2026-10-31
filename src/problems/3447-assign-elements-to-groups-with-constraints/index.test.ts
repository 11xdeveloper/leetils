import { describe, expect, it } from "bun:test";
import { assignElementsToGroupsWithConstraints as assignElements } from ".";

describe("3447. Assign Elements to Groups with Constraints", () => {
	it("solves the examples from the problem statement", () => {
		expect(assignElements([8, 4, 3, 2, 4], [4, 2])).toEqual([0, 0, -1, 1, 0]);
		expect(assignElements([2, 3, 5, 7], [5, 3, 3])).toEqual([-1, 1, 0, -1]);
		expect(assignElements([10, 21, 30, 41], [2, 1])).toEqual([0, 1, 0, 1]);
	});
});
