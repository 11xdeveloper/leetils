import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumWidthRamp as maxWidthRamp } from ".";

describe("962. Maximum Width Ramp", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxWidthRamp([6, 0, 8, 2, 1, 5])).toBe(4);
		expect(maxWidthRamp([9, 8, 1, 0, 1, 9, 4, 0, 4, 1])).toBe(7);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(962);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(2, 15), 0, 9);
			let expected = 0;
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j < nums.length; j++)
					if ((nums[i] ?? 0) <= (nums[j] ?? 0))
						expected = Math.max(expected, j - i);
			expect(maxWidthRamp(nums)).toBe(expected);
		}
	});
});
