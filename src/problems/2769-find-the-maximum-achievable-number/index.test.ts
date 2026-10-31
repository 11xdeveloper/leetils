import { describe, expect, it } from "bun:test";
import { findTheMaximumAchievableNumber as theMaximumAchievableX } from ".";

describe("2769. Find the Maximum Achievable Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(theMaximumAchievableX(4, 1)).toBe(6);
		expect(theMaximumAchievableX(3, 2)).toBe(7);
	});
});
