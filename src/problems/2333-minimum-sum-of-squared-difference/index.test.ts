import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSumOfSquaredDifference as minSumSquareDiff } from ".";

/** Reduces the largest difference one unit at a time. */
const bySimulation = (nums1: number[], nums2: number[], k: number): number => {
	const differences = nums1.map((a, i) => Math.abs(a - (nums2[i] ?? 0)));
	for (; k > 0; k--) {
		const largest = Math.max(...differences);
		if (largest === 0) break;
		differences[differences.indexOf(largest)] = largest - 1;
	}
	return differences.reduce((sum, d) => sum + d * d, 0);
};

describe("2333. Minimum Sum of Squared Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSumSquareDiff([1, 2, 3, 4], [2, 10, 20, 19], 0, 0)).toBe(579);
		expect(minSumSquareDiff([1, 4, 10, 12], [5, 8, 6, 9], 1, 1)).toBe(43);
	});

	it("matches reducing one unit at a time on random inputs", () => {
		const random = createRandom(2333);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const nums1 = random.array(n, 0, 10);
			const nums2 = random.array(n, 0, 10);
			const [k1, k2] = [random.int(0, 8), random.int(0, 8)];
			expect(minSumSquareDiff(nums1, nums2, k1, k2)).toBe(
				bySimulation(nums1, nums2, k1 + k2),
			);
		}
	});
});
