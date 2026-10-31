import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNonAdjacentSubsetsInARootedTree as countValidSubsets } from ".";

/** Tries every set. */
const byBruteForce = (parent: number[], nums: number[], k: number): number => {
	let count = 0;
	for (let mask = 1; mask < 1 << parent.length; mask++) {
		if (parent.some((p, v) => p >= 0 && (mask >> v) & 1 && (mask >> p) & 1))
			continue;
		if (nums.reduce((s, x, v) => ((mask >> v) & 1 ? s + x : s), 0) % k === 0)
			count++;
	}
	return count;
};

describe("3939. Count Non Adjacent Subsets in a Rooted Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(countValidSubsets([-1, 0, 1], [1, 2, 3], 3)).toBe(1);
		expect(countValidSubsets([-1, 0, 0, 0], [2, 1, 2, 1], 3)).toBe(2);
	});

	it("matches trying every set on random trees", () => {
		const random = createRandom(3939);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const parent = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const nums = random.array(n, 1, 20);
			const k = random.int(1, 6);
			expect(countValidSubsets(parent, nums, k)).toBe(
				byBruteForce(parent, nums, k),
			);
		}
	});
});
