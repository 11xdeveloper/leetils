import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nonDecreasingArray as checkPossibility } from ".";

const isSorted = (values: number[]): boolean =>
	values.every((value, i) => i === 0 || (values[i - 1] ?? 0) <= value);

/** Tries changing each element to each of the other values, or to itself. */
const byBruteForce = (nums: number[]): boolean =>
	isSorted(nums) ||
	nums.some((_, i) => nums.some((value) => isSorted(nums.with(i, value))));

describe("665. Non-decreasing Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkPossibility([4, 2, 3])).toBeTrue();
		expect(checkPossibility([4, 2, 1])).toBeFalse();
	});

	it("chooses which of the two elements to change", () => {
		expect(checkPossibility([3, 4, 2, 3])).toBeFalse();
		expect(checkPossibility([5, 7, 1, 8])).toBeTrue();
	});

	it("matches trying every change on random inputs", () => {
		const random = createRandom(665);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 8), -5, 5);
			expect(checkPossibility(nums)).toBe(byBruteForce(nums));
		}
	});
});
