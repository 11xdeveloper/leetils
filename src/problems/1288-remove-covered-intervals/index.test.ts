import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeCoveredIntervals } from ".";

/** Checks every interval against every other. */
const byBruteForce = (intervals: number[][]): number =>
	intervals.filter(
		([a = 0, b = 0], i) =>
			!intervals.some(([c = 0, d = 0], j) => i !== j && c <= a && b <= d),
	).length;

describe("1288. Remove Covered Intervals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			removeCoveredIntervals([
				[1, 4],
				[3, 6],
				[2, 8],
			]),
		).toBe(2);
		expect(
			removeCoveredIntervals([
				[1, 4],
				[2, 3],
			]),
		).toBe(1);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1288);
		for (let run = 0; run < 300; run++) {
			const keys = new Set<string>();
			for (let i = random.int(1, 10); i > 0; i--) {
				const a = random.int(0, 10);
				keys.add(`${a},${random.int(a + 1, 12)}`);
			}
			const intervals = [...keys].map((key) => key.split(",").map(Number));
			expect(removeCoveredIntervals(intervals)).toBe(byBruteForce(intervals));
		}
	});
});
