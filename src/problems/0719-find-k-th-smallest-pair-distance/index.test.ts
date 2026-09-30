import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findKThSmallestPairDistance as smallestDistancePair } from ".";

describe("719. Find K-th Smallest Pair Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestDistancePair([1, 3, 1], 1)).toBe(0);
		expect(smallestDistancePair([1, 1, 1], 2)).toBe(0);
		expect(smallestDistancePair([1, 6, 1], 3)).toBe(5);
	});

	it("matches sorting every distance on random inputs", () => {
		const random = createRandom(719);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(2, 12), 0, 30);
			const distances: number[] = [];
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j < nums.length; j++)
					distances.push(Math.abs((nums[i] ?? 0) - (nums[j] ?? 0)));
			distances.sort((a, b) => a - b);
			const k = random.int(1, distances.length);
			expect(smallestDistancePair(nums, k)).toBe(distances[k - 1] ?? 0);
		}
	});
});
