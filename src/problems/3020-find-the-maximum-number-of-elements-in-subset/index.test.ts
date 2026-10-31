import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMaximumNumberOfElementsInSubset as maximumLength } from ".";

/** Builds every pattern from every start and checks it fits. */
const byBruteForce = (nums: number[]): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let best = 1;
	for (const start of counts.keys())
		for (let m = 0; m < 6; m++) {
			const pattern: number[] = [];
			let value = start;
			for (let i = 0; i < m; i++) {
				pattern.push(value, value);
				value *= value;
			}
			pattern.push(value);
			const need = new Map<number, number>();
			for (const p of pattern) need.set(p, (need.get(p) ?? 0) + 1);
			if ([...need].every(([v, c]) => (counts.get(v) ?? 0) >= c))
				best = Math.max(best, pattern.length);
		}
	return best;
};

describe("3020. Find the Maximum Number of Elements in Subset", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumLength([5, 4, 1, 2, 2])).toBe(3);
		expect(maximumLength([1, 3, 2, 4])).toBe(1);
	});

	it("matches building every pattern on random arrays", () => {
		const random = createRandom(3020);
		for (let run = 0; run < 300; run++) {
			const nums = Array.from(
				{ length: random.int(1, 10) },
				() => [1, 2, 3, 4, 9, 16, 81, 256][random.int(0, 7)] ?? 1,
			);
			expect(maximumLength(nums)).toBe(byBruteForce(nums));
		}
	});
});
