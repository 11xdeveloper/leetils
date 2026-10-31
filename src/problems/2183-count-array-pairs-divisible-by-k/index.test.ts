import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countArrayPairsDivisibleByK as countPairs } from ".";

describe("2183. Count Array Pairs Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs([1, 2, 3, 4, 5], 2)).toBe(7);
		expect(countPairs([1, 2, 3, 4], 5)).toBe(0);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(2183);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 30);
			const k = random.int(1, 30);
			let expected = 0;
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j < nums.length; j++)
					if (((nums[i] ?? 0) * (nums[j] ?? 0)) % k === 0) expected++;
			expect(countPairs(nums, k)).toBe(expected);
		}
	});
});
