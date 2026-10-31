import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumPartitionScore as minPartitionScore } from ".";

/** Plain O(k · n²) dynamic programming. */
const byBruteForce = (nums: number[], k: number): number => {
	const n = nums.length;
	let previous = Array.from({ length: n + 1 }, (_, i) =>
		i === 0 ? 0 : Number.POSITIVE_INFINITY,
	);
	for (let parts = 1; parts <= k; parts++) {
		const current = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
		for (let i = 1; i <= n; i++) {
			let s = 0;
			for (let j = i - 1; j >= 0; j--) {
				s += nums[j] ?? 0;
				current[i] = Math.min(
					current[i] ?? 0,
					(previous[j] ?? 0) + (s * (s + 1)) / 2,
				);
			}
		}
		previous = current;
	}
	return previous[n] ?? 0;
};

describe("3826. Minimum Partition Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(minPartitionScore([5, 1, 2, 1], 2)).toBe(25);
		expect(minPartitionScore([1, 2, 3, 4], 1)).toBe(55);
		expect(minPartitionScore([1, 1, 1], 3)).toBe(3);
	});

	it("matches plain dynamic programming on random arrays", () => {
		const random = createRandom(3826);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 14), 1, 20);
			const k = random.int(1, nums.length);
			expect(minPartitionScore(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
