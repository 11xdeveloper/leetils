import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { twoSumLessThanK } from ".";

describe("1099. Two Sum Less Than K", () => {
	it("solves the examples from the problem statement", () => {
		expect(twoSumLessThanK([34, 23, 1, 24, 75, 33, 54, 8], 60)).toBe(58);
		expect(twoSumLessThanK([10, 20, 30], 15)).toBe(-1);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1099);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			const k = random.int(1, 40);
			let expected = -1;
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j < nums.length; j++)
					if ((nums[i] ?? 0) + (nums[j] ?? 0) < k)
						expected = Math.max(expected, (nums[i] ?? 0) + (nums[j] ?? 0));
			expect(twoSumLessThanK(nums, k)).toBe(expected);
		}
	});
});
