import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalSubarrayValueII as maxTotalValue } from ".";

/** Sorts the values of every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	const values: number[] = [];
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const part = nums.slice(i, j + 1);
			values.push(Math.max(...part) - Math.min(...part));
		}
	return values
		.sort((a, b) => b - a)
		.slice(0, k)
		.reduce((a, b) => a + b, 0);
};

describe("3691. Maximum Total Subarray Value II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTotalValue([1, 3, 2], 2)).toBe(4);
		expect(maxTotalValue([4, 2, 5, 1], 3)).toBe(12);
	});

	it("matches sorting every subarray on random arrays", () => {
		const random = createRandom(3691);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 20);
			const k = random.int(1, (nums.length * (nums.length + 1)) / 2);
			expect(maxTotalValue(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
