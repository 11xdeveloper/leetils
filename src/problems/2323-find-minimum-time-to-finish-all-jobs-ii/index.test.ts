import { describe, expect, it } from "bun:test";
import { findMinimumTimeToFinishAllJobsII as minimumTime } from ".";

describe("2323. Find Minimum Time to Finish All Jobs II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTime([5, 2, 4], [1, 7, 5])).toBe(2);
		expect(minimumTime([3, 18, 15, 9], [6, 5, 1, 3])).toBe(3);
	});
});
