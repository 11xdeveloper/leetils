import { describe, expect, it } from "bun:test";
import { minimumAverageDifference } from ".";

describe("2256. Minimum Average Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumAverageDifference([2, 5, 3, 9, 5, 3])).toBe(3);
		expect(minimumAverageDifference([0])).toBe(0);
	});
});
