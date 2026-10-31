import { describe, expect, it } from "bun:test";
import { maximumPossibleNumberByBinaryConcatenation as maxGoodNumber } from ".";

describe("3309. Maximum Possible Number by Binary Concatenation", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxGoodNumber([1, 2, 3])).toBe(30);
		expect(maxGoodNumber([2, 8, 16])).toBe(1296);
	});
});
