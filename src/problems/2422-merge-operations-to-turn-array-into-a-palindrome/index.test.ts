import { describe, expect, it } from "bun:test";
import { mergeOperationsToTurnArrayIntoAPalindrome as minimumOperations } from ".";

describe("2422. Merge Operations to Turn Array Into a Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([4, 3, 2, 1, 2, 3, 1])).toBe(2);
		expect(minimumOperations([1, 2, 3, 4])).toBe(3);
	});
});
