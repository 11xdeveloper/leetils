import { describe, expect, it } from "bun:test";
import { maximumPrimeDifference } from ".";

describe("3115. Maximum Prime Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumPrimeDifference([4, 2, 9, 5, 3])).toBe(3);
		expect(maximumPrimeDifference([4, 8, 2, 8])).toBe(0);
	});
});
