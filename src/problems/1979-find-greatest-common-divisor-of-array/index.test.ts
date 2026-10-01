import { describe, expect, it } from "bun:test";
import { findGreatestCommonDivisorOfArray as findGCD } from ".";

describe("1979. Find Greatest Common Divisor of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findGCD([2, 5, 6, 9, 10])).toBe(2);
		expect(findGCD([7, 5, 6, 8, 3])).toBe(1);
		expect(findGCD([3, 3])).toBe(3);
	});
});
