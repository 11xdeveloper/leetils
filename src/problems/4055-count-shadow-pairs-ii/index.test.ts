import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countShadowPairsII as shadowPairs } from ".";

/** Checks every pair. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++) {
			const [a = 0, b = 0] = [nums[i], nums[j]];
			if (a < b && !nums.slice(i + 1, j).some((x) => a < x && x < b)) count++;
		}
	return count;
};

describe("4055. Count Shadow Pairs II", () => {
	it("solves the examples from the problem statement", () => {
		expect(shadowPairs([3, 1, 4, 2, 5])).toBe(5);
		expect(shadowPairs([6, 7, 8, 9])).toBe(3);
	});

	it("matches checking every pair on random arrays", () => {
		const random = createRandom(4055);
		for (let run = 0; run < 400; run++) {
			const nums = random.array(random.int(3, 16), 1, 6);
			expect(shadowPairs(nums)).toBe(byBruteForce(nums));
		}
	});
});
