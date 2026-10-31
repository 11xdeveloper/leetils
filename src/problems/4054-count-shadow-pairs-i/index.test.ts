import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countShadowPairsI as shadowPairs } from ".";

/** Checks every pair. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++) {
			if ((nums[i] ?? 0) >= (nums[j] ?? 0)) continue;
			if (!nums.slice(i + 1, j).some((x) => x < (nums[i] ?? 0))) count++;
		}
	return count;
};

describe("4054. Count Shadow Pairs I", () => {
	it("solves the examples from the problem statement", () => {
		expect(shadowPairs([3, 1, 4, 1, 5])).toBe(3);
		expect(shadowPairs([6, 7, 6, 6, 7])).toBe(4);
		expect(shadowPairs([1, 2, 3, 4])).toBe(6);
	});

	it("matches checking every pair on random arrays", () => {
		const random = createRandom(4054);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 12), 1, 5);
			expect(shadowPairs(nums)).toBe(byBruteForce(nums));
		}
	});
});
