import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { zeroArrayTransformationIII as maxRemoval } from ".";

/** Tries every subset of queries to keep. */
const byBruteForce = (nums: number[], queries: number[][]): number => {
	let best = -1;
	for (let mask = 0; mask < 1 << queries.length; mask++) {
		const cover = nums.map(() => 0);
		let kept = 0;
		queries.forEach(([l = 0, r = 0], q) => {
			if (!((mask >> q) & 1)) return;
			kept++;
			for (let i = l; i <= r; i++) cover[i] = (cover[i] ?? 0) + 1;
		});
		if (nums.every((v, i) => (cover[i] ?? 0) >= v))
			best = Math.max(best, queries.length - kept);
	}
	return best;
};

describe("3362. Zero Array Transformation III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxRemoval(
				[2, 0, 2],
				[
					[0, 2],
					[0, 2],
					[1, 1],
				],
			),
		).toBe(1);
		expect(
			maxRemoval(
				[1, 1, 1, 1],
				[
					[1, 3],
					[0, 2],
					[1, 3],
					[1, 2],
				],
			),
		).toBe(2);
		expect(maxRemoval([1, 2, 3, 4], [[0, 3]])).toBe(-1);
	});

	it("matches trying every subset on random queries", () => {
		const random = createRandom(3362);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 5), 0, 2);
			const queries = Array.from({ length: random.int(1, 7) }, () => {
				const l = random.int(0, nums.length - 1);
				return [l, random.int(l, nums.length - 1)];
			});
			expect(maxRemoval(nums, queries)).toBe(byBruteForce(nums, queries));
		}
	});
});
