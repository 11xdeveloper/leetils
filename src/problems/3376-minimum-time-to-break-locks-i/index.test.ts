import { describe, expect, it } from "bun:test";
import { minimumTimeToBreakLocksI as findMinimumTime } from ".";

describe("3376. Minimum Time to Break Locks I", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinimumTime([3, 4, 1], 1)).toBe(4);
		expect(findMinimumTime([2, 5, 4], 2)).toBe(5);
	});
});
