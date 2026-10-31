import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPrimeGapBalancedSubarrays as primeSubarray } from ".";

const isPrime = (x: number) => {
	if (x < 2) return false;
	for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
	return true;
};

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const primes = nums.slice(i, j + 1).filter(isPrime);
			if (primes.length >= 2 && Math.max(...primes) - Math.min(...primes) <= k)
				count++;
		}
	return count;
};

describe("3589. Count Prime-Gap Balanced Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(primeSubarray([1, 2, 3], 1)).toBe(2);
		expect(primeSubarray([2, 3, 5, 7], 3)).toBe(4);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3589);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 20);
			const k = random.int(0, 10);
			expect(primeSubarray(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
