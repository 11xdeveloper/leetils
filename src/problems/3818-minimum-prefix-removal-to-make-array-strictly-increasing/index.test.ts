import { describe, expect, it } from "bun:test";
import { minimumPrefixRemovalToMakeArrayStrictlyIncreasing as minimumPrefixLength } from ".";

describe("3818. Minimum Prefix Removal to Make Array Strictly Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPrefixLength([1, -1, 2, 3, 3, 4, 5])).toBe(4);
		expect(minimumPrefixLength([4, 3, -2, -5])).toBe(3);
		expect(minimumPrefixLength([1, 2, 3, 4])).toBe(0);
	});
});
