import { describe, expect, it } from "bun:test";
import { integersWithMultipleSumOfTwoCubes as findGoodIntegers } from ".";

describe("3890. Integers With Multiple Sum of Two Cubes", () => {
	it("solves the examples from the problem statement", () => {
		expect(findGoodIntegers(4104)).toEqual([1729, 4104]);
		expect(findGoodIntegers(578)).toEqual([]);
	});

	it("finds the next taxicab numbers", () => {
		expect(findGoodIntegers(40033)).toEqual([
			1729, 4104, 13832, 20683, 32832, 39312, 40033,
		]);
	});
});
