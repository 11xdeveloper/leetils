import { describe, expect, it } from "bun:test";
import { numberOfStepsToReduceANumberToZero as numberOfSteps } from ".";

/** Follows the steps. */
const byBruteForce = (num: number): number => {
	let steps = 0;
	for (let n = num; n > 0; n = n % 2 === 0 ? n / 2 : n - 1) steps++;
	return steps;
};

describe("1342. Number of Steps to Reduce a Number to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSteps(14)).toBe(6);
		expect(numberOfSteps(8)).toBe(4);
		expect(numberOfSteps(123)).toBe(12);
	});

	it("matches following the steps up to 10^6", () => {
		for (let num = 0; num <= 10 ** 6; num += 97)
			expect(numberOfSteps(num)).toBe(byBruteForce(num));
	});
});
