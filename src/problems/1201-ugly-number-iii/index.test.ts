import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { uglyNumberIII as nthUglyNumber } from ".";

/** Counts up through the integers. */
const byBruteForce = (n: number, a: number, b: number, c: number): number => {
	let found = 0;
	for (let x = 1; ; x++) {
		if (x % a === 0 || x % b === 0 || x % c === 0) found++;
		if (found === n) return x;
	}
};

describe("1201. Ugly Number III", () => {
	it("solves the examples from the problem statement", () => {
		expect(nthUglyNumber(3, 2, 3, 5)).toBe(4);
		expect(nthUglyNumber(4, 2, 3, 4)).toBe(6);
		expect(nthUglyNumber(5, 2, 11, 13)).toBe(10);
	});

	it("handles huge divisors whose multiples leave the range", () => {
		expect(nthUglyNumber(1, 10 ** 9, 10 ** 9 - 1, 10 ** 9 - 2)).toBe(
			10 ** 9 - 2,
		);
		expect(nthUglyNumber(4, 10 ** 9, 10 ** 9 - 1, 10 ** 9 - 2)).toBe(
			2 * (10 ** 9 - 2),
		);
		expect(nthUglyNumber(10 ** 9, 2, 217983653, 336916467)).toBe(1999999984);
	});

	it("matches counting up on random inputs", () => {
		const random = createRandom(1201);
		for (let run = 0; run < 300; run++) {
			const [a, b, c] = [
				random.int(1, 30),
				random.int(1, 30),
				random.int(1, 30),
			];
			const n = random.int(1, 100);
			expect(nthUglyNumber(n, a, b, c)).toBe(byBruteForce(n, a, b, c));
		}
	});
});
