import { describe, expect, it } from "bun:test";
import { smallestMissingIntegerGreaterThanSequentialPrefixSum as missingInteger } from ".";

describe("2996. Smallest Missing Integer Greater Than Sequential Prefix Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(missingInteger([1, 2, 3, 2, 5])).toBe(6);
		expect(missingInteger([3, 4, 5, 1, 12, 14, 13])).toBe(15);
	});
});
