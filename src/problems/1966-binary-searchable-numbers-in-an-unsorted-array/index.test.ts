import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { binarySearchableNumbersInAnUnsortedArray as binarySearchableNumbers } from ".";

/** Checks every sequence of pivot choices for every target. */
const byBruteForce = (nums: number[]): number => {
	const alwaysFound = (sequence: number[], target: number): boolean =>
		sequence.length > 0 &&
		sequence.every((pivot, i) => {
			if (pivot === target) return true;
			return alwaysFound(
				pivot < target ? sequence.slice(i + 1) : sequence.slice(0, i),
				target,
			);
		});
	return nums.filter((target) => alwaysFound(nums, target)).length;
};

describe("1966. Binary Searchable Numbers in an Unsorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(binarySearchableNumbers([7])).toBe(1);
		expect(binarySearchableNumbers([-1, 5, 2])).toBe(1);
	});

	it("matches trying every pivot sequence on random arrays", () => {
		const random = createRandom(1966);
		for (let run = 0; run < 200; run++) {
			const nums = [...new Set(random.array(random.int(1, 7), -10, 10))];
			expect(binarySearchableNumbers(nums)).toBe(byBruteForce(nums));
		}
	});
});
