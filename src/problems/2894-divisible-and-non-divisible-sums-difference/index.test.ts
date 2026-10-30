import { describe, expect, it } from "bun:test";
import { divisibleAndNonDivisibleSumsDifference as differenceOfSums } from ".";

describe("2894. Divisible and Non-divisible Sums Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(differenceOfSums(10, 3)).toBe(19);
		expect(differenceOfSums(5, 6)).toBe(15);
		expect(differenceOfSums(5, 1)).toBe(-15);
	});
});
