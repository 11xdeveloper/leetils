import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { multiplyTwoPolynomials as multiply } from ".";

/** Multiplies term by term. */
const byBruteForce = (a: number[], b: number[]): number[] => {
	const result = new Array<number>(a.length + b.length - 1).fill(0);
	a.forEach((x, i) => {
		b.forEach((y, j) => {
			result[i + j] = (result[i + j] ?? 0) + x * y;
		});
	});
	return result;
};

describe("3549. Multiply Two Polynomials", () => {
	it("solves the examples from the problem statement", () => {
		expect(multiply([3, 2, 5], [1, 4])).toEqual([3, 14, 13, 20]);
		expect(multiply([1, 0, -2], [-1])).toEqual([-1, 0, 2]);
		expect(multiply([1, 5, -3], [-4, 2, 0])).toEqual([-4, -18, 22, -6, 0]);
	});

	it("matches term-by-term multiplication on random polynomials", () => {
		const random = createRandom(3549);
		for (let run = 0; run < 100; run++) {
			const a = random.array(random.int(1, 40), -1000, 1000);
			const b = random.array(random.int(1, 40), -1000, 1000);
			expect(multiply(a, b)).toEqual(byBruteForce(a, b));
		}
	});

	it("rounds exactly for long polynomials", () => {
		const a = new Array<number>(50000).fill(1000);
		const b = new Array<number>(50000).fill(-1000);
		const product = multiply(a, b);
		expect(product[49999]).toBe(-5e10);
		expect(product[0]).toBe(-1e6);
	});
});
