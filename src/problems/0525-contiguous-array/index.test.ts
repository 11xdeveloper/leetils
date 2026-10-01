import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { contiguousArray as findMaxLength } from ".";

const byBruteForce = (nums: number[]): number => {
	let longest = 0;
	for (let i = 0; i < nums.length; i++) {
		let balance = 0;
		for (let j = i; j < nums.length; j++) {
			balance += nums[j] === 1 ? 1 : -1;
			if (balance === 0) longest = Math.max(longest, j - i + 1);
		}
	}
	return longest;
};

describe("525. Contiguous Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaxLength([0, 1])).toBe(2);
		expect(findMaxLength([0, 1, 0])).toBe(2);
		expect(findMaxLength([0, 1, 1, 1, 1, 1, 0, 0, 0])).toBe(6);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(525);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 20), 0, 1);
			expect(findMaxLength(nums)).toBe(byBruteForce(nums));
		}
	});
});
