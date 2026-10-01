import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { frequencyOfTheMostFrequentElement as maxFrequency } from ".";

/** For each target value, raises the largest elements below it first. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (const target of nums) {
		const below = nums.filter((v) => v < target).sort((a, b) => b - a);
		let [count, left] = [nums.filter((v) => v === target).length, k];
		for (const value of below) {
			if (target - value > left) break;
			left -= target - value;
			count++;
		}
		best = Math.max(best, count);
	}
	return best;
};

describe("1838. Frequency of the Most Frequent Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFrequency([1, 2, 4], 5)).toBe(3);
		expect(maxFrequency([1, 4, 8, 13], 5)).toBe(2);
		expect(maxFrequency([3, 9, 6], 2)).toBe(1);
	});

	it("matches trying every target on random inputs", () => {
		const random = createRandom(1838);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 15);
			const k = random.int(0, 20);
			expect(maxFrequency(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
