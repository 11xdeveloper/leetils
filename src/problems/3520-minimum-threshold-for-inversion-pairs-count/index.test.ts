import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumThresholdForInversionPairsCount as minThreshold } from ".";

/** Tries every threshold, counting pairs directly. */
const byBruteForce = (nums: number[], k: number): number => {
	for (let x = 0; x <= 20; x++) {
		let count = 0;
		for (let i = 0; i < nums.length; i++)
			for (let j = i + 1; j < nums.length; j++) {
				const [a = 0, b = 0] = [nums[i], nums[j]];
				if (a > b && a - b <= x) count++;
			}
		if (count >= k) return x;
	}
	return -1;
};

describe("3520. Minimum Threshold for Inversion Pairs Count", () => {
	it("solves the examples from the problem statement", () => {
		expect(minThreshold([1, 2, 3, 4, 3, 2, 1], 7)).toBe(2);
		expect(minThreshold([10, 9, 9, 9, 1], 4)).toBe(8);
	});

	it("matches trying every threshold on random arrays", () => {
		const random = createRandom(3520);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 10);
			const k = random.int(1, 10);
			expect(minThreshold(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
