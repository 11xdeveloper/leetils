import { describe, expect, it } from "bun:test";
import { countBeautifulNumbers as beautifulNumbers } from ".";

/** Checks every number. */
const byBruteForce = (l: number, r: number): number => {
	let count = 0;
	for (let x = l; x <= r; x++) {
		const digits = [...String(x)].map(Number);
		const product = digits.reduce((a, b) => a * b, 1);
		const sum = digits.reduce((a, b) => a + b, 0);
		if (product % sum === 0) count++;
	}
	return count;
};

describe("3490. Count Beautiful Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulNumbers(10, 20)).toBe(2);
		expect(beautifulNumbers(1, 15)).toBe(10);
	});

	it("matches checking every number in small ranges", () => {
		for (const [l, r] of [
			[1, 1000],
			[537, 4321],
			[9999, 12345],
		] as const)
			expect(beautifulNumbers(l, r)).toBe(byBruteForce(l, r));
	});

	it("handles bounds up to 10^9", () => {
		expect(beautifulNumbers(1, 1e9)).toBeGreaterThan(0);
	});
});
