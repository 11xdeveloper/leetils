import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumErasureValue as maximumUniqueSubarray } from ".";

describe("1695. Maximum Erasure Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumUniqueSubarray([4, 2, 4, 5, 6])).toBe(17);
		expect(maximumUniqueSubarray([5, 2, 1, 2, 5, 2, 1, 2, 5])).toBe(8);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1695);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 6);
			let best = 0;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i; j < nums.length; j++) {
					const sub = nums.slice(i, j + 1);
					if (new Set(sub).size === sub.length)
						best = Math.max(
							best,
							sub.reduce((sum, num) => sum + num, 0),
						);
				}
			}
			expect(maximumUniqueSubarray(nums)).toBe(best);
		}
	});
});
