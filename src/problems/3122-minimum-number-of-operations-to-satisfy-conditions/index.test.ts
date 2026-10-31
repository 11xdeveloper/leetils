import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToSatisfyConditions as minimumOperations } from ".";

describe("3122. Minimum Number of Operations to Satisfy Conditions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumOperations([
				[1, 0, 2],
				[1, 0, 2],
			]),
		).toBe(0);
		expect(
			minimumOperations([
				[1, 1, 1],
				[0, 0, 0],
			]),
		).toBe(3);
		expect(minimumOperations([[1], [2], [3]])).toBe(2);
	});
});
