import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreOfNonOverlappingIntervals as maximumWeight } from ".";

/** Tries every set of up to four intervals. */
const byBruteForce = (intervals: number[][]): number[] => {
	let best: [number, number[]] = [0, []];
	const n = intervals.length;
	for (let mask = 1; mask < 1 << n; mask++) {
		const chosen = intervals.map((_, i) => i).filter((i) => (mask >> i) & 1);
		if (chosen.length > 4) continue;
		const ok = chosen.every((a) =>
			chosen.every(
				(b) =>
					a === b ||
					(intervals[a]?.[1] ?? 0) < (intervals[b]?.[0] ?? 0) ||
					(intervals[b]?.[1] ?? 0) < (intervals[a]?.[0] ?? 0),
			),
		);
		if (!ok) continue;
		const weight = chosen.reduce((sum, i) => sum + (intervals[i]?.[2] ?? 0), 0);
		const lex = (() => {
			for (let i = 0; i < Math.min(chosen.length, best[1].length); i++)
				if (chosen[i] !== best[1][i])
					return (chosen[i] ?? 0) < (best[1][i] ?? 0);
			return chosen.length < best[1].length;
		})();
		if (weight > best[0] || (weight === best[0] && lex))
			best = [weight, chosen];
	}
	return best[1];
};

describe("3414. Maximum Score of Non-overlapping Intervals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumWeight([
				[1, 3, 2],
				[4, 5, 2],
				[1, 5, 5],
				[6, 9, 3],
				[6, 7, 1],
				[8, 9, 1],
			]),
		).toEqual([2, 3]);
		expect(
			maximumWeight([
				[5, 8, 1],
				[6, 7, 7],
				[4, 7, 3],
				[9, 10, 6],
				[7, 8, 2],
				[11, 14, 3],
				[3, 5, 5],
			]),
		).toEqual([1, 3, 5, 6]);
	});

	it("matches trying every choice on random intervals", () => {
		const random = createRandom(3414);
		for (let run = 0; run < 200; run++) {
			const intervals = Array.from({ length: random.int(1, 8) }, () => {
				const l = random.int(1, 12);
				return [l, l + random.int(0, 4), random.int(1, 4)];
			});
			expect(maximumWeight(intervals)).toEqual(byBruteForce(intervals));
		}
	});
});
