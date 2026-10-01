import { describe, expect, it } from "bun:test";
import { addMinimumNumberOfRungs as addRungs } from ".";

describe("1936. Add Minimum Number of Rungs", () => {
	it("solves the examples from the problem statement", () => {
		expect(addRungs([1, 3, 5, 10], 2)).toBe(2);
		expect(addRungs([3, 6, 8, 10], 3)).toBe(0);
		expect(addRungs([3, 4, 6, 7], 2)).toBe(1);
	});
});
