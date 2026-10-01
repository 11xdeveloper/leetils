import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxConsecutiveOnesIII as longestOnes } from ".";

describe("1004. Max Consecutive Ones III", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)).toBe(6);
		expect(
			longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3),
		).toBe(10);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1004);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), 0, 1);
			const k = random.int(0, 4);
			let expected = 0;
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j <= nums.length; j++)
					if (nums.slice(i, j).filter((x) => x === 0).length <= k)
						expected = Math.max(expected, j - i);
			expect(longestOnes(nums, k)).toBe(expected);
		}
	});
});
