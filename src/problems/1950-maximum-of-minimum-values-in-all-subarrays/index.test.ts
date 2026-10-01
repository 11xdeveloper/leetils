import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumOfMinimumValuesInAllSubarrays as findMaximums } from ".";

describe("1950. Maximum of Minimum Values in All Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaximums([0, 1, 2, 4])).toEqual([4, 2, 1, 0]);
		expect(findMaximums([10, 20, 50, 10])).toEqual([50, 20, 10, 10]);
	});

	it("matches checking every window on random inputs", () => {
		const random = createRandom(1950);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 10);
			const expected = nums.map((_, i) =>
				Math.max(
					...nums
						.slice(0, nums.length - i)
						.map((__, s) => Math.min(...nums.slice(s, s + i + 1))),
				),
			);
			expect(findMaximums(nums)).toEqual(expected);
		}
	});
});
