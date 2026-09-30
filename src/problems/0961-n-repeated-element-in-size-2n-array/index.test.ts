import { describe, expect, it } from "bun:test";
import { nRepeatedElementInSize2nArray as repeatedNTimes } from ".";

describe("961. N-Repeated Element in Size 2N Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(repeatedNTimes([1, 2, 3, 3])).toBe(3);
		expect(repeatedNTimes([2, 1, 2, 5, 3, 2])).toBe(2);
		expect(repeatedNTimes([5, 1, 5, 2, 5, 3, 5, 4])).toBe(5);
	});
});
