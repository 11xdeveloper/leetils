import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeInterval } from ".";

/** Marks each unit cell [x, x + 1) and reads the runs back. */
const byBruteForce = (intervals: number[][], cut: number[]): number[][] => {
	const [cutStart = 0, cutEnd = 0] = cut;
	const covered = (x: number) =>
		intervals.some(([a = 0, b = 0]) => a <= x && x < b) &&
		!(cutStart <= x && x < cutEnd);
	const result: number[][] = [];
	for (let x = -30; x < 30; x++) {
		if (!covered(x)) continue;
		const last = result.at(-1);
		if (last && last[1] === x) last[1] = x + 1;
		else result.push([x, x + 1]);
	}
	return result;
};

describe("1272. Remove Interval", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			removeInterval(
				[
					[0, 2],
					[3, 4],
					[5, 7],
				],
				[1, 6],
			),
		).toEqual([
			[0, 1],
			[6, 7],
		]);
		expect(removeInterval([[0, 5]], [2, 3])).toEqual([
			[0, 2],
			[3, 5],
		]);
		expect(
			removeInterval(
				[
					[-5, -4],
					[-3, -2],
					[1, 2],
					[3, 5],
					[8, 9],
				],
				[-1, 4],
			),
		).toEqual([
			[-5, -4],
			[-3, -2],
			[4, 5],
			[8, 9],
		]);
	});

	it("matches marking unit cells on random inputs", () => {
		const random = createRandom(1272);
		for (let run = 0; run < 300; run++) {
			// Distinct sorted points paired up give disjoint intervals with gaps between them.
			const points = [...new Set(random.array(8, -20, 20))].sort(
				(a, b) => a - b,
			);
			const intervals: number[][] = [];
			for (let i = 0; i + 1 < points.length; i += 2)
				intervals.push([points[i] ?? 0, points[i + 1] ?? 0]);
			if (intervals.length === 0) continue;
			const a = random.int(-25, 24);
			const cut = [a, random.int(a + 1, 25)];
			expect(removeInterval(intervals, cut)).toEqual(
				byBruteForce(intervals, cut),
			);
		}
	});
});
