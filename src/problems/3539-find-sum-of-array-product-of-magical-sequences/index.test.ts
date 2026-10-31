import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findSumOfArrayProductOfMagicalSequences as magicalSum } from ".";

/** Tries every sequence of indices. */
const byBruteForce = (m: number, k: number, nums: number[]): number => {
	const n = nums.length;
	let total = 0n;
	for (let code = 0; code < n ** m; code++) {
		let sum = 0n;
		let product = 1n;
		for (let rest = code, i = 0; i < m; i++, rest = Math.floor(rest / n)) {
			sum += 1n << BigInt(rest % n);
			product *= BigInt(nums[rest % n] ?? 0);
		}
		if (sum.toString(2).replaceAll("0", "").length === k) total += product;
	}
	return Number(total % 1_000_000_007n);
};

describe("3539. Find Sum of Array Product of Magical Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(magicalSum(5, 5, [1, 10, 100, 10000, 1000000])).toBe(991600007);
		expect(magicalSum(2, 2, [5, 4, 3, 2, 1])).toBe(170);
		expect(magicalSum(1, 1, [28])).toBe(28);
	});

	it("matches trying every sequence on small inputs", () => {
		const random = createRandom(3539);
		for (let run = 0; run < 60; run++) {
			const nums = random.array(random.int(1, 4), 1, 9);
			const m = random.int(1, 4);
			const k = random.int(1, m);
			expect(magicalSum(m, k, nums)).toBe(byBruteForce(m, k, nums));
		}
	});
});
