import { describe, expect, it } from "bun:test";
import { findTheMinimumNumberOfFibonacciNumbersWhoseSumIsK as findMinFibonacciNumbers } from ".";

/** Coin-change dynamic programming with the Fibonacci numbers as coins. */
const fewestFor = (limit: number): number[] => {
	const coins = [1, 2];
	while ((coins.at(-1) ?? 0) + (coins.at(-2) ?? 0) <= limit)
		coins.push((coins.at(-1) ?? 0) + (coins.at(-2) ?? 0));
	const fewest = new Array<number>(limit + 1).fill(Infinity);
	fewest[0] = 0;
	for (let value = 1; value <= limit; value++) {
		for (const coin of coins) {
			if (coin <= value)
				fewest[value] = Math.min(
					fewest[value] ?? Infinity,
					(fewest[value - coin] ?? Infinity) + 1,
				);
		}
	}
	return fewest;
};

describe("1414. Find the Minimum Number of Fibonacci Numbers Whose Sum Is K", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinFibonacciNumbers(7)).toBe(2);
		expect(findMinFibonacciNumbers(10)).toBe(2);
		expect(findMinFibonacciNumbers(19)).toBe(3);
	});

	it("uses one number for Fibonacci numbers and two just past them", () => {
		expect(findMinFibonacciNumbers(1)).toBe(1);
		expect(findMinFibonacciNumbers(701408733)).toBe(1);
		expect(findMinFibonacciNumbers(701408734)).toBe(2);
	});

	it("matches coin-change dynamic programming up to 5000", () => {
		const fewest = fewestFor(5000);
		for (let k = 1; k <= 5000; k++)
			expect(findMinFibonacciNumbers(k)).toBe(fewest[k] ?? 0);
	});
});
