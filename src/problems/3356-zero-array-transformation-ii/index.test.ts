import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { zeroArrayTransformationII as minZeroArray } from ".";

/** Tries each prefix of queries. */
const byBruteForce = (nums: number[], queries: number[][]): number => {
	for (let k = 0; k <= queries.length; k++) {
		const cover = nums.map(() => 0);
		for (const [l = 0, r = 0, val = 0] of queries.slice(0, k))
			for (let i = l; i <= r; i++) cover[i] = (cover[i] ?? 0) + val;
		if (nums.every((v, i) => (cover[i] ?? 0) >= v)) return k;
	}
	return -1;
};

describe("3356. Zero Array Transformation II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minZeroArray(
				[2, 0, 2],
				[
					[0, 2, 1],
					[0, 2, 1],
					[1, 1, 3],
				],
			),
		).toBe(2);
		expect(
			minZeroArray(
				[4, 3, 2, 1],
				[
					[1, 3, 2],
					[0, 2, 1],
				],
			),
		).toBe(-1);
	});

	it("matches trying each prefix on random queries", () => {
		const random = createRandom(3356);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 6), 0, 4);
			const queries = Array.from({ length: random.int(1, 6) }, () => {
				const l = random.int(0, nums.length - 1);
				return [l, random.int(l, nums.length - 1), random.int(1, 3)];
			});
			expect(minZeroArray(nums, queries)).toBe(byBruteForce(nums, queries));
		}
	});
});
