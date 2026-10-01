import { describe, expect, it } from "bun:test";
import { factorialTrailingZeroes } from ".";

const byFactorial = (n: number): number => {
	let factorial = 1n;
	for (let i = 2n; i <= BigInt(n); i++) factorial *= i;
	return String(factorial).length - String(factorial).replace(/0+$/, "").length;
};

describe("172. Factorial Trailing Zeroes", () => {
	it("solves the examples from the problem statement", () => {
		expect(factorialTrailingZeroes(3)).toBe(0);
		expect(factorialTrailingZeroes(5)).toBe(1);
		expect(factorialTrailingZeroes(0)).toBe(0);
	});

	it("counts extra zeros from powers of 5", () => {
		expect(factorialTrailingZeroes(25)).toBe(6);
		expect(factorialTrailingZeroes(10_000)).toBe(2499);
	});

	it("matches computing the factorial exactly", () => {
		for (let n = 0; n <= 300; n++) {
			expect(factorialTrailingZeroes(n)).toBe(byFactorial(n));
		}
	});
});
