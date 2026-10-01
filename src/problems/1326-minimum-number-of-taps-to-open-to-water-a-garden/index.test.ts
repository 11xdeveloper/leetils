import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfTapsToOpenToWaterAGarden as minTaps } from ".";

/** Tries every set of taps. */
const byBruteForce = (n: number, ranges: number[]): number => {
	let best = Infinity;
	for (let mask = 0; mask < 2 ** ranges.length; mask++) {
		const open = ranges.flatMap((range, i) =>
			mask & (1 << i) ? [[i - range, i + range]] : [],
		);
		// Every unit stretch [x, x + 1] must lie inside one tap's range.
		let covers = true;
		for (let x = 0; x < n; x++) {
			if (!open.some(([a = 0, b = 0]) => a <= x && x + 1 <= b)) covers = false;
		}
		if (covers) best = Math.min(best, open.length);
	}
	return best === Infinity ? -1 : best;
};

describe("1326. Minimum Number of Taps to Open to Water a Garden", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTaps(5, [3, 4, 1, 1, 0, 0])).toBe(1);
		expect(minTaps(3, [0, 0, 0, 0])).toBe(-1);
	});

	it("matches trying every set of taps on random gardens", () => {
		const random = createRandom(1326);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 9);
			const ranges = random.array(n + 1, 0, 3);
			expect(minTaps(n, ranges)).toBe(byBruteForce(n, ranges));
		}
	});
});
