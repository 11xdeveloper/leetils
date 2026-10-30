import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTheMinimumPoweredCity as maxPower } from ".";

/** Places stations one at a time in every possible way. */
const byBruteForce = (stations: number[], r: number, k: number): number => {
	const minPower = (s: number[]): number =>
		Math.min(
			...s.map((_, i) =>
				s.slice(Math.max(0, i - r), i + r + 1).reduce((sum, x) => sum + x, 0),
			),
		);
	const place = (s: number[], left: number, from: number): number => {
		if (left === 0) return minPower(s);
		let best = 0;
		for (let i = from; i < s.length; i++) {
			s[i] = (s[i] ?? 0) + 1;
			best = Math.max(best, place(s, left - 1, i));
			s[i] = (s[i] ?? 0) - 1;
		}
		return best;
	};
	return place([...stations], k, 0);
};

describe("2528. Maximize the Minimum Powered City", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPower([1, 2, 4, 5, 0], 1, 2)).toBe(5);
		expect(maxPower([4, 4, 4, 4], 0, 3)).toBe(4);
	});

	it("matches trying every placement on random inputs", () => {
		const random = createRandom(2528);
		for (let run = 0; run < 200; run++) {
			const stations = random.array(random.int(1, 6), 0, 4);
			const r = random.int(0, 2);
			const k = random.int(0, 4);
			expect(maxPower(stations, r, k)).toBe(byBruteForce(stations, r, k));
		}
	});
});
