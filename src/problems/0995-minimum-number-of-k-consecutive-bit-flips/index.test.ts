import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfKConsecutiveBitFlips as minKBitFlips } from ".";

/** Tries every set of flip positions. */
const byBruteForce = (nums: number[], k: number): number => {
	const starts = nums.length - k + 1;
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << starts; mask++) {
		const bits = [...nums];
		let count = 0;
		for (let s = 0; s < starts; s++) {
			if (!(mask & (1 << s))) continue;
			count++;
			for (let i = s; i < s + k; i++) bits[i] = 1 - (bits[i] ?? 0);
		}
		if (bits.every((bit) => bit === 1)) best = Math.min(best, count);
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("995. Minimum Number of K Consecutive Bit Flips", () => {
	it("solves the examples from the problem statement", () => {
		expect(minKBitFlips([0, 1, 0], 1)).toBe(2);
		expect(minKBitFlips([1, 1, 0], 2)).toBe(-1);
		expect(minKBitFlips([0, 0, 0, 1, 0, 1, 1, 0], 3)).toBe(3);
	});

	it("matches trying every set of flips on random arrays", () => {
		const random = createRandom(995);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 0, 1);
			const k = random.int(1, nums.length);
			expect(minKBitFlips(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
