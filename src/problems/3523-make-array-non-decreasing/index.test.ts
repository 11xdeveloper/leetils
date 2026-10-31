import { describe, expect, it } from "bun:test";
import { makeArrayNonDecreasing as maximumPossibleSize } from ".";

describe("3523. Make Array Non-decreasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumPossibleSize([4, 2, 5, 3, 5])).toBe(3);
		expect(maximumPossibleSize([1, 2, 3])).toBe(3);
	});
});
