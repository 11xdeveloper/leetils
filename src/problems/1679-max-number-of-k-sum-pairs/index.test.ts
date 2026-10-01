import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxNumberOfKSumPairs as maxOperations } from ".";

/** Sorts and matches from both ends. */
const byTwoPointers = (nums: number[], k: number): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let [i, j, pairs] = [0, sorted.length - 1, 0];
	while (i < j) {
		const sum = (sorted[i] ?? 0) + (sorted[j] ?? 0);
		if (sum === k) {
			pairs++;
			i++;
			j--;
		} else if (sum < k) i++;
		else j--;
	}
	return pairs;
};

describe("1679. Max Number of K-Sum Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxOperations([1, 2, 3, 4], 5)).toBe(2);
		expect(maxOperations([3, 1, 3, 4, 3], 6)).toBe(1);
	});

	it("matches two pointers on random inputs", () => {
		const random = createRandom(1679);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 6);
			const k = random.int(2, 12);
			expect(maxOperations(nums, k)).toBe(byTwoPointers(nums, k));
		}
	});
});
