import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arrayPartition as arrayPairSum } from ".";

/** Pairs the first number with every other in turn, recursively. */
const byBruteForce = (nums: number[]): number => {
	if (nums.length === 0) return 0;
	const [first = 0, ...rest] = nums;
	return Math.max(
		...rest.map(
			(other, i) =>
				Math.min(first, other) + byBruteForce(rest.filter((_, j) => j !== i)),
		),
	);
};

describe("561. Array Partition", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrayPairSum([1, 4, 3, 2])).toBe(4);
		expect(arrayPairSum([6, 2, 6, 5, 1, 2])).toBe(9);
	});

	it("matches trying every pairing on random inputs", () => {
		const random = createRandom(561);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(2 * random.int(1, 4), -10, 10);
			expect(arrayPairSum(nums)).toBe(byBruteForce(nums));
		}
	});
});
