import { describe, expect, it } from "bun:test";
import { maximumNumberOfGroupsWithIncreasingLength as maxIncreasingGroups } from ".";

describe("2790. Maximum Number of Groups With Increasing Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxIncreasingGroups([1, 2, 5])).toBe(3);
		expect(maxIncreasingGroups([2, 1, 2])).toBe(2);
		expect(maxIncreasingGroups([1, 1])).toBe(1);
	});
});
