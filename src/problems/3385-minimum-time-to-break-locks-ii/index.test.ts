import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToBreakLocksII as findMinimumTime } from ".";

/** Bitmask dynamic programming over which locks are broken. */
const byBruteForce = (strength: number[]): number => {
	const n = strength.length;
	const best = new Array<number>(1 << n).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (let mask = 0; mask < 1 << n; mask++) {
		const broken = mask.toString(2).replaceAll("0", "").length;
		for (let lock = 0; lock < n; lock++)
			if (!((mask >> lock) & 1))
				best[mask | (1 << lock)] = Math.min(
					best[mask | (1 << lock)] ?? 0,
					(best[mask] ?? 0) + Math.ceil((strength[lock] ?? 0) / (1 + broken)),
				);
	}
	return best[(1 << n) - 1] ?? 0;
};

describe("3385. Minimum Time to Break Locks II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinimumTime([3, 4, 1])).toBe(4);
		expect(findMinimumTime([2, 5, 4])).toBe(6);
	});

	it("matches bitmask dynamic programming on random locks", () => {
		const random = createRandom(3385);
		for (let run = 0; run < 200; run++) {
			const strength = random.array(random.int(1, 8), 1, 50);
			expect(findMinimumTime(strength)).toBe(byBruteForce(strength));
		}
	});

	it("handles 80 locks", () => {
		const strength = Array.from(
			{ length: 80 },
			(_, i) => ((i * 7919) % 1000000) + 1,
		);
		expect(findMinimumTime(strength)).toBeGreaterThan(0);
	});
});
