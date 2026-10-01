import { describe, expect, it } from "bun:test";
import { findTheHighestAltitude as largestAltitude } from ".";

describe("1732. Find the Highest Altitude", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestAltitude([-5, 1, 5, 0, -7])).toBe(1);
		expect(largestAltitude([-4, -3, -2, -1, 4, 3, 2])).toBe(0);
	});
});
