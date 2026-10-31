import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToMakeElementsInArrayDistinct as minimumOperations } from ".";

describe("3396. Minimum Number of Operations to Make Elements in Array Distinct", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([1, 2, 3, 4, 2, 3, 3, 5, 7])).toBe(2);
		expect(minimumOperations([4, 5, 6, 4, 4])).toBe(2);
		expect(minimumOperations([6, 7, 8, 9])).toBe(0);
	});
});
