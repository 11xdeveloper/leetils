import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfValidSubarrays as validSubarrays } from ".";

describe("1063. Number of Valid Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(validSubarrays([1, 4, 2, 5, 3])).toBe(11);
		expect(validSubarrays([3, 2, 1])).toBe(3);
		expect(validSubarrays([2, 2, 2])).toBe(6);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1063);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 0, 5);
			let expected = 0;
			for (let i = 0; i < nums.length; i++)
				for (let j = i; j < nums.length; j++)
					if (nums.slice(i, j + 1).every((v) => v >= (nums[i] ?? 0)))
						expected++;
			expect(validSubarrays(nums)).toBe(expected);
		}
	});
});
