import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findProductsOfElementsOfBigArray as findProductsOfElements } from ".";

const big: number[] = [];
for (let i = 1; big.length < 2000; i++)
	for (let bit = 0; 1 << bit <= i; bit++)
		if ((i >> bit) & 1) big.push(2 ** bit);

/** Multiplies the elements out. */
const byBruteForce = ([from = 0, to = 0, mod = 1]: number[]): number => {
	let product = 1 % mod;
	for (let i = from; i <= to; i++) product = (product * (big[i] ?? 1)) % mod;
	return product;
};

describe("3145. Find Products of Elements of Big Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findProductsOfElements([[1, 3, 7]])).toEqual([4]);
		expect(
			findProductsOfElements([
				[2, 5, 3],
				[7, 7, 4],
			]),
		).toEqual([2, 2]);
	});

	it("matches multiplying out random ranges", () => {
		const random = createRandom(3145);
		const queries = Array.from({ length: 200 }, () => {
			const from = random.int(0, 1500);
			return [from, random.int(from, 1999), random.int(1, 1000)];
		});
		expect(findProductsOfElements(queries)).toEqual(queries.map(byBruteForce));
	});

	it("handles indices near 10^15", () => {
		const [result = -1] = findProductsOfElements([[1e15 - 10, 1e15, 99991]]);
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThan(99991);
	});
});
