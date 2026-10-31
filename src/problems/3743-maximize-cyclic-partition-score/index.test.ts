import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeCyclicPartitionScore as maximumScore } from ".";

/** Tries every rotation and every set of cuts. */
const byBruteForce = (nums: number[], k: number): number => {
	const n = nums.length;
	let best = 0;
	for (let start = 0; start < n; start++) {
		const arr = [...nums.slice(start), ...nums.slice(0, start)];
		for (let mask = 0; mask < 1 << (n - 1); mask++) {
			let cuts = 0;
			for (let x = mask; x; x &= x - 1) cuts++;
			if (cuts + 1 > k) continue;
			let [total, from] = [0, 0];
			for (let i = 0; i < n; i++)
				if (i === n - 1 || (mask >> i) & 1) {
					const part = arr.slice(from, i + 1);
					total += Math.max(...part) - Math.min(...part);
					from = i + 1;
				}
			best = Math.max(best, total);
		}
	}
	return best;
};

describe("3743. Maximize Cyclic Partition Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumScore([1, 2, 3, 3], 2)).toBe(3);
		expect(maximumScore([1, 2, 3, 3], 1)).toBe(2);
		expect(maximumScore([1, 2, 3, 3], 4)).toBe(3);
	});

	it("matches trying every split on random arrays", () => {
		const random = createRandom(3743);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 8), 0, 9);
			const k = random.int(1, nums.length);
			expect(maximumScore(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
