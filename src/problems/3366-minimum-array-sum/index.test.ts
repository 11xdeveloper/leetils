import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumArraySum as minArraySum } from ".";

/** Tries every assignment of operations to elements. */
const byBruteForce = (
	nums: number[],
	k: number,
	op1: number,
	op2: number,
): number => {
	let best = Number.POSITIVE_INFINITY;
	const choose = (i: number, a: number, b: number, sum: number): void => {
		if (i === nums.length) {
			best = Math.min(best, sum);
			return;
		}
		const v = nums[i] ?? 0;
		choose(i + 1, a, b, sum + v);
		if (a < op1) choose(i + 1, a + 1, b, sum + Math.ceil(v / 2));
		if (b < op2 && v >= k) choose(i + 1, a, b + 1, sum + v - k);
		if (a < op1 && b < op2) {
			if (Math.ceil(v / 2) >= k)
				choose(i + 1, a + 1, b + 1, sum + Math.ceil(v / 2) - k);
			if (v >= k) choose(i + 1, a + 1, b + 1, sum + Math.ceil((v - k) / 2));
		}
	};
	choose(0, 0, 0, 0);
	return best;
};

describe("3366. Minimum Array Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minArraySum([2, 8, 3, 19, 3], 3, 1, 1)).toBe(23);
		expect(minArraySum([2, 4, 3], 3, 2, 1)).toBe(3);
	});

	it("matches trying every assignment on random arrays", () => {
		const random = createRandom(3366);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 6), 0, 20);
			const k = random.int(0, 8);
			const [op1, op2] = [random.int(0, 3), random.int(0, 3)];
			expect(minArraySum(nums, k, op1, op2)).toBe(
				byBruteForce(nums, k, op1, op2),
			);
		}
	});
});
