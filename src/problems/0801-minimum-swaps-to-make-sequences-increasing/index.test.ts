import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSwapsToMakeSequencesIncreasing as minSwap } from ".";

const byBruteForce = (a: number[], b: number[]): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << a.length; mask++) {
		const x = a.map((value, i) => (mask & (1 << i) ? (b[i] ?? 0) : value));
		const y = b.map((value, i) => (mask & (1 << i) ? (a[i] ?? 0) : value));
		const increasing = (values: number[]) =>
			values.every((value, i) => i === 0 || (values[i - 1] ?? 0) < value);
		if (increasing(x) && increasing(y)) {
			let swaps = 0;
			for (let bits = mask; bits; bits &= bits - 1) swaps++;
			best = Math.min(best, swaps);
		}
	}
	return best;
};

describe("801. Minimum Swaps To Make Sequences Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwap([1, 3, 5, 4], [1, 2, 3, 7])).toBe(1);
		expect(minSwap([0, 3, 5, 8, 9], [2, 1, 4, 6, 9])).toBe(1);
	});

	it("matches trying every set of swaps on random solvable inputs", () => {
		const random = createRandom(801);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 9);
			// Build two increasing arrays, then swap some indices to scramble them.
			const a: number[] = [];
			const b: number[] = [];
			for (let i = 0; i < n; i++) {
				a.push((a.at(-1) ?? 0) + random.int(1, 3));
				b.push((b.at(-1) ?? 0) + random.int(1, 3));
			}
			for (let i = 0; i < n; i++)
				if (random.int(0, 1)) [a[i], b[i]] = [b[i] ?? 0, a[i] ?? 0];
			expect(minSwap(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
