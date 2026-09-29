import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { threeSumSmaller } from ".";

const byBruteForce = (nums: number[], target: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			for (let k = j + 1; k < nums.length; k++) {
				if ((nums[i] ?? 0) + (nums[j] ?? 0) + (nums[k] ?? 0) < target) count++;
			}
		}
	}
	return count;
};

describe("259. 3Sum Smaller", () => {
	it("solves the examples from the problem statement", () => {
		expect(threeSumSmaller([-2, 0, 1, 3], 2)).toBe(2);
		expect(threeSumSmaller([], 0)).toBe(0);
		expect(threeSumSmaller([0], 0)).toBe(0);
	});

	it("does not modify the input", () => {
		const nums = [3, 1, 2];
		threeSumSmaller(nums, 10);
		expect(nums).toEqual([3, 1, 2]);
	});

	it("matches checking every triplet on random inputs", () => {
		const random = createRandom(259);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(0, 15), -10, 10);
			const target = random.int(-15, 15);
			expect(threeSumSmaller(nums, target)).toBe(byBruteForce(nums, target));
		}
	});
});
