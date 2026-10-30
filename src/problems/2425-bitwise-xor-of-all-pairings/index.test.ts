import { describe, expect, it } from "bun:test";
import { bitwiseXorOfAllPairings as xorAllNums } from ".";

describe("2425. Bitwise XOR of All Pairings", () => {
	it("solves the examples from the problem statement", () => {
		expect(xorAllNums([2, 1, 3], [10, 2, 5, 0])).toBe(13);
		expect(xorAllNums([1, 2], [3, 4])).toBe(0);
	});
});
