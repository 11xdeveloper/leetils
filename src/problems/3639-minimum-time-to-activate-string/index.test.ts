import { describe, expect, it } from "bun:test";
import { minimumTimeToActivateString as minTime } from ".";

describe("3639. Minimum Time to Activate String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTime("abc", [1, 0, 2], 2)).toBe(0);
		expect(minTime("cat", [0, 2, 1], 6)).toBe(2);
		expect(minTime("xy", [0, 1], 4)).toBe(-1);
	});
});
