import { describe, expect, it } from "bun:test";
import { distinctPrimeFactorsOfProductOfArray as distinctPrimeFactors } from ".";

describe("2521. Distinct Prime Factors of Product of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctPrimeFactors([2, 4, 3, 7, 10, 6])).toBe(4);
		expect(distinctPrimeFactors([2, 4, 8, 16])).toBe(1);
	});
});
