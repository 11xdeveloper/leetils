import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { increasingTripletSubsequence as increasingTriplet } from ".";

const byBruteForce = (nums: number[]): boolean =>
	nums.some((a, i) =>
		nums.some((b, j) => j > i && b > a && nums.some((c, k) => k > j && c > b)),
	);

describe("334. Increasing Triplet Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(increasingTriplet([1, 2, 3, 4, 5])).toBeTrue();
		expect(increasingTriplet([5, 4, 3, 2, 1])).toBeFalse();
		expect(increasingTriplet([2, 1, 5, 0, 4, 6])).toBeTrue();
	});

	it("requires strictly increasing values", () => {
		expect(increasingTriplet([1, 1, 1])).toBeFalse();
		expect(increasingTriplet([1, 2, 2])).toBeFalse();
	});

	it("matches checking every triplet on random inputs", () => {
		const random = createRandom(334);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), 0, 6);
			expect(increasingTriplet(nums)).toBe(byBruteForce(nums));
		}
	});
});
