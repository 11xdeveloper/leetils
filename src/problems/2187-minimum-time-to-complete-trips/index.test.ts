import { describe, expect, it } from "bun:test";
import { minimumTimeToCompleteTrips as minimumTime } from ".";

describe("2187. Minimum Time to Complete Trips", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTime([1, 2, 3], 5)).toBe(3);
		expect(minimumTime([2], 1)).toBe(2);
	});

	it("handles the largest inputs", () => {
		expect(minimumTime([10_000_000], 10_000_000)).toBe(100_000_000_000_000);
	});
});
