import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { twoBestNonOverlappingEvents as maxTwoEvents } from ".";

/** Tries every event alone and every compatible pair. */
const byBruteForce = (events: number[][]): number => {
	let best = 0;
	for (const [i, [s1 = 0, e1 = 0, v1 = 0]] of events.entries()) {
		best = Math.max(best, v1);
		for (const [s2 = 0, e2 = 0, v2 = 0] of events.slice(i + 1)) {
			if (e1 < s2 || e2 < s1) best = Math.max(best, v1 + v2);
		}
	}
	return best;
};

describe("2054. Two Best Non-Overlapping Events", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxTwoEvents([
				[1, 3, 2],
				[4, 5, 2],
				[2, 4, 3],
			]),
		).toBe(4);
		expect(
			maxTwoEvents([
				[1, 3, 2],
				[4, 5, 2],
				[1, 5, 5],
			]),
		).toBe(5);
		expect(
			maxTwoEvents([
				[1, 5, 3],
				[1, 5, 1],
				[6, 6, 5],
			]),
		).toBe(8);
	});

	it("matches trying every pair on random inputs", () => {
		const random = createRandom(2054);
		for (let run = 0; run < 300; run++) {
			const events = Array.from({ length: random.int(2, 8) }, () => {
				const start = random.int(1, 10);
				return [start, random.int(start, 12), random.int(1, 10)];
			});
			expect(maxTwoEvents(events)).toBe(byBruteForce(events));
		}
	});
});
