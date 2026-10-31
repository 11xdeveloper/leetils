import { describe, expect, it } from "bun:test";
import { sumOfPrimesBetweenNumberAndItsReverse as sumOfPrimesInRange } from ".";

describe("3918. Sum of Primes Between Number and Its Reverse", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfPrimesInRange(13)).toBe(132);
		expect(sumOfPrimesInRange(10)).toBe(17);
		expect(sumOfPrimesInRange(8)).toBe(0);
	});
});
