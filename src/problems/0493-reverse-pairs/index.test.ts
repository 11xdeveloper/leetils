import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reversePairs } from ".";

const byBruteForce = (nums: number[]): number => {
	let pairs = 0;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++)
			if ((nums[i] ?? 0) > 2 * (nums[j] ?? 0)) pairs++;
	}
	return pairs;
};

describe("493. Reverse Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(reversePairs([1, 3, 2, 3, 1])).toBe(2);
		expect(reversePairs([2, 4, 3, 5, 1])).toBe(3);
	});

	it("doubles the extremes of the 32-bit range without overflow", () => {
		expect(reversePairs([2 ** 31 - 1, 2 ** 31 - 1, 2 ** 31 - 1])).toBe(0);
		expect(reversePairs([-(2 ** 31), -(2 ** 31)])).toBe(1);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(493);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 40), -20, 20);
			expect(reversePairs(nums)).toBe(byBruteForce(nums));
		}
	});
});
