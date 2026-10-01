import { describe, expect, it } from "bun:test";
import { threeConsecutiveOdds } from ".";

describe("1550. Three Consecutive Odds", () => {
	it("solves the examples from the problem statement", () => {
		expect(threeConsecutiveOdds([2, 6, 4, 1])).toBeFalse();
		expect(threeConsecutiveOdds([1, 2, 34, 3, 4, 5, 7, 23, 12])).toBeTrue();
	});

	it("needs the odd numbers to be consecutive", () => {
		expect(threeConsecutiveOdds([1, 3, 2, 5, 7])).toBeFalse();
		expect(threeConsecutiveOdds([1, 3, 5])).toBeTrue();
	});
});
