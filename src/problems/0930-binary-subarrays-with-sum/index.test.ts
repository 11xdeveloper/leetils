import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { binarySubarraysWithSum as numSubarraysWithSum } from ".";

describe("930. Binary Subarrays With Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSubarraysWithSum([1, 0, 1, 0, 1], 2)).toBe(4);
		expect(numSubarraysWithSum([0, 0, 0, 0, 0], 0)).toBe(15);
	});

	it("matches summing every subarray on random inputs", () => {
		const random = createRandom(930);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), 0, 1);
			const goal = random.int(0, 5);
			let expected = 0;
			for (let i = 0; i < nums.length; i++) {
				let sum = 0;
				for (let j = i; j < nums.length; j++) {
					sum += nums[j] ?? 0;
					if (sum === goal) expected++;
				}
			}
			expect(numSubarraysWithSum(nums, goal)).toBe(expected);
		}
	});
});
