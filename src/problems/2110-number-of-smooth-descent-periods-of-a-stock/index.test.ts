import { describe, expect, it } from "bun:test";
import { numberOfSmoothDescentPeriodsOfAStock as descentPeriods } from ".";

describe("2110. Number of Smooth Descent Periods of a Stock", () => {
	it("solves the examples from the problem statement", () => {
		expect(descentPeriods([3, 2, 1, 4])).toBe(7);
		expect(descentPeriods([8, 6, 7, 7])).toBe(4);
		expect(descentPeriods([1])).toBe(1);
	});
});
