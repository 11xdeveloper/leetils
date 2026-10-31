import { describe, expect, it } from "bun:test";
import { closestPrimeNumbersInRange as closestPrimes } from ".";

describe("2523. Closest Prime Numbers in Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(closestPrimes(10, 19)).toEqual([11, 13]);
		expect(closestPrimes(4, 6)).toEqual([-1, -1]);
	});

	it("doesn't count 1 as a prime", () => {
		expect(closestPrimes(1, 3)).toEqual([2, 3]);
		expect(closestPrimes(1, 2)).toEqual([-1, -1]);
	});
});
