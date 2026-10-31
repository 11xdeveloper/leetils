import { describe, expect, it } from "bun:test";
import { maxSumOfAPairWithEqualSumOfDigits as maximumSum } from ".";

describe("2342. Max Sum of a Pair With Equal Sum of Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSum([18, 43, 36, 13, 7])).toBe(54);
		expect(maximumSum([10, 12, 19, 14])).toBe(-1);
	});
});
