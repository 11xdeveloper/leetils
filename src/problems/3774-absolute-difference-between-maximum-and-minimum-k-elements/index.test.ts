import { describe, expect, it } from "bun:test";
import { absoluteDifferenceBetweenMaximumAndMinimumKElements as absDifference } from ".";

describe("3774. Absolute Difference Between Maximum and Minimum K Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(absDifference([5, 2, 2, 4], 2)).toBe(5);
		expect(absDifference([100], 1)).toBe(0);
	});
});
