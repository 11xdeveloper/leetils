import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeTheMaximumAdjacentElementDifference as minDifference } from ".";

/** Tries every pair and every way of filling the gaps. */
const byBruteForce = (nums: number[]): number => {
	const holes = nums.flatMap((v, i) => (v === -1 ? [i] : []));
	let best = Number.POSITIVE_INFINITY;
	for (let x = 1; x <= 8; x++)
		for (let y = x; y <= 8; y++)
			for (let mask = 0; mask < 1 << holes.length; mask++) {
				const filled = [...nums];
				holes.forEach((at, i) => {
					filled[at] = (mask >> i) & 1 ? y : x;
				});
				let worst = 0;
				for (let i = 1; i < filled.length; i++)
					worst = Math.max(
						worst,
						Math.abs((filled[i] ?? 0) - (filled[i - 1] ?? 0)),
					);
				best = Math.min(best, worst);
			}
	return best;
};

describe("3357. Minimize the Maximum Adjacent Element Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDifference([1, 2, -1, 10, 8])).toBe(4);
		expect(minDifference([-1, -1, -1])).toBe(0);
		expect(minDifference([-1, 10, -1, 8])).toBe(1);
	});

	it("matches trying every filling on random arrays", () => {
		const random = createRandom(3357);
		for (let run = 0; run < 200; run++) {
			const nums = Array.from({ length: random.int(2, 7) }, () =>
				random.int(0, 2) === 0 ? -1 : random.int(1, 8),
			);
			expect(minDifference(nums)).toBe(byBruteForce(nums));
		}
	});
});
