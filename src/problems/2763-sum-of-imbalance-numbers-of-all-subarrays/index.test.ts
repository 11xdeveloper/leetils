import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfImbalanceNumbersOfAllSubarrays as sumImbalanceNumbers } from ".";

/** Sorts every subarray. */
const byBruteForce = (nums: number[]): number => {
	let total = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const sorted = nums.slice(i, j + 1).sort((a, b) => a - b);
			for (let k = 1; k < sorted.length; k++)
				if ((sorted[k] ?? 0) - (sorted[k - 1] ?? 0) > 1) total++;
		}
	return total;
};

describe("2763. Sum of Imbalance Numbers of All Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumImbalanceNumbers([2, 3, 1, 4])).toBe(3);
		expect(sumImbalanceNumbers([1, 3, 3, 3, 5])).toBe(8);
	});

	it("matches sorting every subarray on random inputs", () => {
		const random = createRandom(2763);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const nums = random.array(n, 1, n);
			expect(sumImbalanceNumbers(nums)).toBe(byBruteForce(nums));
		}
	});
});
