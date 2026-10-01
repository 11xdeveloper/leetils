import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findArrayGivenSubsetSums as recoverArray } from ".";

const subsetSums = (nums: number[]) => {
	let sums = [0];
	for (const num of nums) sums = [...sums, ...sums.map((s) => s + num)];
	return sums.sort((a, b) => a - b);
};

describe("1982. Find Array Given Subset Sums", () => {
	it("solves the examples from the problem statement", () => {
		for (const [n, sums] of [
			[3, [-3, -2, -1, 0, 0, 1, 2, 3]],
			[2, [0, 0, 0, 0]],
			[4, [0, 0, 5, 5, 4, -1, 4, 9, 9, -1, 4, 3, 4, 8, 3, 8]],
		] as const) {
			expect(subsetSums(recoverArray(n, sums))).toEqual(
				[...sums].sort((a, b) => a - b),
			);
		}
	});

	it("recovers an array with the same subset sums for random inputs", () => {
		const random = createRandom(1982);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 7), -10, 10);
			const sums = subsetSums(nums).sort(() => random.int(0, 2) - 1);
			const result = recoverArray(nums.length, sums);
			expect(result.length).toBe(nums.length);
			expect(subsetSums(result)).toEqual(subsetSums(nums));
		}
	});
});
