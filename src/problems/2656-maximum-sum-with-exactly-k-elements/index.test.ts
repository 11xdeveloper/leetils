import { describe, expect, it } from "bun:test";
import { maximumSumWithExactlyKElements as maximizeSum } from ".";

describe("2656. Maximum Sum With Exactly K Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeSum([1, 2, 3, 4, 5], 3)).toBe(18);
		expect(maximizeSum([5, 5, 5], 2)).toBe(11);
	});
});
