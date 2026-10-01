import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfEventsThatCanBeAttendedII as maxValue } from ".";

/** Tries every set of events. */
const byBruteForce = (events: number[][], k: number): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << events.length; mask++) {
		const chosen = events.filter((_, i) => mask & (1 << i));
		if (chosen.length > k) continue;
		const overlap = chosen.some(([s1 = 0, e1 = 0], i) =>
			chosen.some(([s2 = 0, e2 = 0], j) => i < j && s1 <= e2 && s2 <= e1),
		);
		if (!overlap)
			best = Math.max(
				best,
				chosen.reduce((sum, [, , v = 0]) => sum + v, 0),
			);
	}
	return best;
};

describe("1751. Maximum Number of Events That Can Be Attended II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxValue(
				[
					[1, 2, 4],
					[3, 4, 3],
					[2, 3, 1],
				],
				2,
			),
		).toBe(7);
		expect(
			maxValue(
				[
					[1, 2, 4],
					[3, 4, 3],
					[2, 3, 10],
				],
				2,
			),
		).toBe(10);
		expect(
			maxValue(
				[
					[1, 1, 1],
					[2, 2, 2],
					[3, 3, 3],
					[4, 4, 4],
				],
				3,
			),
		).toBe(9);
	});

	it("matches trying every set of events on random inputs", () => {
		const random = createRandom(1751);
		for (let run = 0; run < 200; run++) {
			const events = Array.from({ length: random.int(1, 8) }, () => {
				const start = random.int(1, 10);
				return [start, random.int(start, 12), random.int(1, 10)];
			});
			const k = random.int(1, events.length);
			expect(maxValue(events, k)).toBe(byBruteForce(events, k));
		}
	});
});
