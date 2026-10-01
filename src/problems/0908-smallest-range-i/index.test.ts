import { describe, expect, it } from "bun:test";
import { smallestRangeI } from ".";

describe("908. Smallest Range I", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestRangeI([1], 0)).toBe(0);
		expect(smallestRangeI([0, 10], 2)).toBe(6);
		expect(smallestRangeI([1, 3, 6], 3)).toBe(0);
	});
});
