import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findingTheNumberOfVisibleMountains as visibleMountains } from ".";

/** Checks every peak against every other mountain. */
const byBruteForce = (peaks: number[][]): number =>
	peaks.filter(
		([x = 0, y = 0], i) =>
			!peaks.some(([a = 0, b = 0], j) => j !== i && y <= b - Math.abs(x - a)),
	).length;

describe("2345. Finding the Number of Visible Mountains", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			visibleMountains([
				[2, 2],
				[6, 3],
				[5, 4],
			]),
		).toBe(2);
		expect(
			visibleMountains([
				[1, 3],
				[1, 3],
			]),
		).toBe(0);
	});

	it("matches checking every pair on random peaks", () => {
		const random = createRandom(2345);
		for (let run = 0; run < 300; run++) {
			const peaks = Array.from({ length: random.int(1, 7) }, () => [
				random.int(1, 8),
				random.int(1, 5),
			]);
			expect(visibleMountains(peaks)).toBe(byBruteForce(peaks));
		}
	});
});
