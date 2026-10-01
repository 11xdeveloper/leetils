import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { divideArrayInSetsOfKConsecutiveNumbers as isPossibleDivide } from ".";

/** Repeatedly removes a run starting at the smallest remaining number. */
const byBruteForce = (nums: number[], k: number): boolean => {
	const left = [...nums];
	while (left.length > 0) {
		const start = Math.min(...left);
		for (let value = start; value < start + k; value++) {
			const i = left.indexOf(value);
			if (i === -1) return false;
			left.splice(i, 1);
		}
	}
	return true;
};

describe("1296. Divide Array in Sets of K Consecutive Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPossibleDivide([1, 2, 3, 3, 4, 4, 5, 6], 4)).toBeTrue();
		expect(
			isPossibleDivide([3, 2, 1, 2, 3, 4, 3, 4, 5, 9, 10, 11], 3),
		).toBeTrue();
		expect(isPossibleDivide([1, 2, 3, 4], 3)).toBeFalse();
	});

	it("matches removing runs from the smallest on random inputs", () => {
		const random = createRandom(1296);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 6);
			const k = random.int(1, nums.length);
			expect(isPossibleDivide(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
