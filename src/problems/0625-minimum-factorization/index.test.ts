import { describe, expect, it } from "bun:test";
import { minimumFactorization as smallestFactorization } from ".";

describe("625. Minimum Factorization", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestFactorization(48)).toBe(68);
		expect(smallestFactorization(15)).toBe(35);
	});

	it("handles single digits, impossible products and 32-bit overflow", () => {
		expect(smallestFactorization(1)).toBe(1);
		expect(smallestFactorization(7)).toBe(7);
		expect(smallestFactorization(11)).toBe(0);
		expect(smallestFactorization(2 ** 31 - 1)).toBe(0);
		expect(smallestFactorization(9 ** 9)).toBe(999999999);
		expect(smallestFactorization(9 ** 10)).toBe(0);
	});

	it("matches the smallest number with each digit product, for products up to 1,000", () => {
		const smallest = new Map<number, number>();
		for (let x = 99_999; x >= 1; x--) {
			const product = [...String(x)].reduce(
				(total, digit) => total * Number(digit),
				1,
			);
			smallest.set(product, x);
		}
		for (let num = 1; num <= 1000; num++)
			expect(smallestFactorization(num)).toBe(smallest.get(num) ?? 0);
	});
});
