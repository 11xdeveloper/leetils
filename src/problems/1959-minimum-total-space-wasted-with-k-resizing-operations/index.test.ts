import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTotalSpaceWastedWithKResizingOperations as minSpaceWastedKResizing } from ".";

/** Tries every set of resize points. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Infinity;
	for (let mask = 0; mask < 1 << (nums.length - 1); mask++) {
		let cuts = 0;
		for (let bits = mask; bits > 0; bits &= bits - 1) cuts++;
		if (cuts > k) continue;
		let [waste, start] = [0, 0];
		for (let i = 1; i <= nums.length; i++) {
			if (i === nums.length || mask & (1 << (i - 1))) {
				const segment = nums.slice(start, i);
				waste +=
					Math.max(...segment) * segment.length -
					segment.reduce((s, v) => s + v, 0);
				start = i;
			}
		}
		best = Math.min(best, waste);
	}
	return best;
};

describe("1959. Minimum Total Space Wasted With K Resizing Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSpaceWastedKResizing([10, 20], 0)).toBe(10);
		expect(minSpaceWastedKResizing([10, 20, 30], 1)).toBe(10);
		expect(minSpaceWastedKResizing([10, 20, 15, 30, 20], 2)).toBe(15);
	});

	it("matches trying every set of resizes on random inputs", () => {
		const random = createRandom(1959);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 9), 1, 20);
			const k = random.int(0, nums.length - 1);
			expect(minSpaceWastedKResizing(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
