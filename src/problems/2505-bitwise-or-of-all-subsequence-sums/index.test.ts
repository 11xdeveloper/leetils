import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bitwiseOrOfAllSubsequenceSums as subsequenceSumOr } from ".";

/** ORs every subset sum. */
const byBruteForce = (nums: number[]): number => {
	let answer = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		let sum = 0;
		for (let i = 0; i < nums.length; i++)
			if ((mask >> i) & 1) sum += nums[i] ?? 0;
		answer |= sum;
	}
	return answer;
};

describe("2505. Bitwise OR of All Subsequence Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsequenceSumOr([2, 1, 0, 3])).toBe(7);
		expect(subsequenceSumOr([0, 0, 0])).toBe(0);
	});

	it("matches enumerating every subsequence on random inputs", () => {
		const random = createRandom(2505);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 40);
			expect(subsequenceSumOr(nums)).toBe(byBruteForce(nums));
		}
	});

	it("handles sums past 32 bits", () => {
		expect(subsequenceSumOr([2 ** 30, 2 ** 30, 2 ** 30, 2 ** 30])).toBe(
			2 ** 30 + 2 ** 31 + 2 ** 32,
		);
	});
});
