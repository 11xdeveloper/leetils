import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberThatSumOfThePricesIsLessThanOrEqualToK as findMaximumNumber } from ".";

/** Adds up prices one number at a time. */
const byBruteForce = (k: number, x: number): number => {
	let total = 0;
	for (let num = 1; ; num++) {
		for (let bit = x - 1; 2 ** bit <= num; bit += x)
			if (Math.floor(num / 2 ** bit) % 2 === 1) total++;
		if (total > k) return num - 1;
	}
};

describe("3007. Maximum Number That Sum of the Prices Is Less Than or Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaximumNumber(9, 1)).toBe(6);
		expect(findMaximumNumber(7, 2)).toBe(9);
	});

	it("matches adding prices one by one", () => {
		const random = createRandom(3007);
		for (let run = 0; run < 200; run++) {
			const k = random.int(1, 3000);
			const x = random.int(1, 8);
			expect(findMaximumNumber(k, x)).toBe(byBruteForce(k, x));
		}
	});

	it("handles k = 10^15", () => {
		// Counts each checked bit over 1 to num with exact integers.
		const prices = (num: number, x: number): bigint => {
			let total = 0n;
			const n = BigInt(num) + 1n;
			for (let bit = BigInt(x - 1); 1n << bit <= n; bit += BigInt(x))
				total +=
					(n >> (bit + 1n)) * (1n << bit) +
					(n % (1n << (bit + 1n)) > 1n << bit
						? (n % (1n << (bit + 1n))) - (1n << bit)
						: 0n);
			return total;
		};
		for (const x of [1, 3, 8]) {
			const num = findMaximumNumber(1e15, x);
			expect(prices(num, x) <= 10n ** 15n).toBeTrue();
			expect(prices(num + 1, x) > 10n ** 15n).toBeTrue();
		}
	});
});
