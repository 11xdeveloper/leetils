import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionArrayToMinimizeXor as minXor } from ".";

/** Tries every set of cuts. */
const byBruteForce = (nums: number[], k: number): number => {
	const n = nums.length;
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << (n - 1); mask++) {
		let cuts = 0;
		for (let m = mask; m; m &= m - 1) cuts++;
		if (cuts !== k - 1) continue;
		let [worst, current] = [0, 0];
		nums.forEach((num, i) => {
			current ^= num;
			if (i === n - 1 || (mask >> i) & 1) {
				worst = Math.max(worst, current);
				current = 0;
			}
		});
		best = Math.min(best, worst);
	}
	return best;
};

describe("3599. Partition Array to Minimize XOR", () => {
	it("solves the examples from the problem statement", () => {
		expect(minXor([1, 2, 3], 2)).toBe(1);
		expect(minXor([2, 3, 3, 2], 3)).toBe(2);
		expect(minXor([1, 1, 2, 3, 1], 2)).toBe(0);
	});

	it("matches trying every set of cuts on random arrays", () => {
		const random = createRandom(3599);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 9), 0, 15);
			const k = random.int(1, nums.length);
			expect(minXor(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
