import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSpecialTriplets as specialTriplets } from ".";

/** Checks every triple. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			for (let k = j + 1; k < nums.length; k++)
				if (nums[i] === 2 * (nums[j] ?? 0) && nums[k] === 2 * (nums[j] ?? 0))
					count++;
	return count;
};

describe("3583. Count Special Triplets", () => {
	it("solves the examples from the problem statement", () => {
		expect(specialTriplets([6, 3, 6])).toBe(1);
		expect(specialTriplets([0, 1, 0, 0])).toBe(1);
		expect(specialTriplets([8, 4, 2, 8, 4])).toBe(2);
	});

	it("matches checking every triple on random arrays", () => {
		const random = createRandom(3583);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(3, 12), 0, 4);
			expect(specialTriplets(nums)).toBe(byBruteForce(nums));
		}
	});
});
