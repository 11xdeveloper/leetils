import { describe, expect, it } from "bun:test";
import { smallestIndexWithDigitSumEqualToIndex as smallestIndex } from ".";

describe("3550. Smallest Index With Digit Sum Equal to Index", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestIndex([1, 3, 2])).toBe(2);
		expect(smallestIndex([1, 10, 11])).toBe(1);
		expect(smallestIndex([1, 2, 3])).toBe(-1);
	});
});
