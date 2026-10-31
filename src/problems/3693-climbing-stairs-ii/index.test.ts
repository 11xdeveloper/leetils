import { describe, expect, it } from "bun:test";
import { climbingStairsII as climbStairs } from ".";

describe("3693. Climbing Stairs II", () => {
	it("solves the examples from the problem statement", () => {
		expect(climbStairs(4, [1, 2, 3, 4])).toBe(13);
		expect(climbStairs(4, [5, 1, 6, 2])).toBe(11);
		expect(climbStairs(3, [9, 8, 3])).toBe(12);
	});
});
