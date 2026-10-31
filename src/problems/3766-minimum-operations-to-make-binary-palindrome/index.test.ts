import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeBinaryPalindrome as minOperations } from ".";

describe("3766. Minimum Operations to Make Binary Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 2, 4])).toEqual([0, 1, 1]);
		expect(minOperations([6, 7, 12])).toEqual([1, 0, 3]);
	});
});
