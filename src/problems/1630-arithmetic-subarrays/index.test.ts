import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arithmeticSubarrays as checkArithmeticSubarrays } from ".";

/** Sorts each range and checks consecutive differences. */
const byBruteForce = (nums: number[], l: number[], r: number[]): boolean[] =>
	l.map((left, i) => {
		const sorted = nums.slice(left, (r[i] ?? 0) + 1).sort((a, b) => a - b);
		return sorted.every(
			(value, j) =>
				j === 0 ||
				value - (sorted[j - 1] ?? 0) === (sorted[1] ?? 0) - (sorted[0] ?? 0),
		);
	});

describe("1630. Arithmetic Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkArithmeticSubarrays([4, 6, 5, 9, 3, 7], [0, 0, 2], [2, 3, 5]),
		).toEqual([true, false, true]);
		expect(
			checkArithmeticSubarrays(
				[-12, -9, -3, -12, -6, 15, 20, -25, -20, -15, -10],
				[0, 1, 6, 4, 8, 7],
				[4, 4, 9, 7, 9, 10],
			),
		).toEqual([false, true, false, false, true, true]);
	});

	it("matches sorting each range on random inputs", () => {
		const random = createRandom(1630);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 10);
			const nums = random.array(n, -3, 3).map((value) => value * 2);
			const l: number[] = [];
			const r: number[] = [];
			for (let q = 0; q < 10; q++) {
				const left = random.int(0, n - 2);
				l.push(left);
				r.push(random.int(left + 1, n - 1));
			}
			expect(checkArithmeticSubarrays(nums, l, r)).toEqual(
				byBruteForce(nums, l, r),
			);
		}
	});
});
