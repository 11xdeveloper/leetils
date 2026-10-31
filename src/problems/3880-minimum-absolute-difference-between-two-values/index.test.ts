import { describe, expect, it } from "bun:test";
import { minimumAbsoluteDifferenceBetweenTwoValues as minAbsoluteDifference } from ".";

describe("3880. Minimum Absolute Difference Between Two Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAbsoluteDifference([1, 0, 0, 2, 0, 1])).toBe(2);
		expect(minAbsoluteDifference([1, 0, 1, 0])).toBe(-1);
	});
});
