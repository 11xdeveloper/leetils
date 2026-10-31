import { describe, expect, it } from "bun:test";
import { manhattanDistancesOfAllArrangementsOfPieces as distanceSum } from ".";

/** Tries every arrangement. */
const byBruteForce = (m: number, n: number, k: number): number => {
	const cells = m * n;
	let total = 0;
	for (let mask = 0; mask < 1 << cells; mask++) {
		const chosen = Array.from({ length: cells }, (_, i) => i).filter(
			(i) => (mask >> i) & 1,
		);
		if (chosen.length !== k) continue;
		for (let a = 0; a < k; a++)
			for (let b = a + 1; b < k; b++) {
				const [p = 0, q = 0] = [chosen[a], chosen[b]];
				total +=
					Math.abs(Math.floor(p / n) - Math.floor(q / n)) +
					Math.abs((p % n) - (q % n));
			}
	}
	return total;
};

describe("3426. Manhattan Distances of All Arrangements of Pieces", () => {
	it("solves the examples from the problem statement", () => {
		expect(distanceSum(2, 2, 2)).toBe(8);
		expect(distanceSum(1, 4, 3)).toBe(20);
	});

	it("matches trying every arrangement on small grids", () => {
		for (let m = 1; m <= 3; m++)
			for (let n = 1; n <= 4; n++)
				for (let k = 2; k <= m * n; k++)
					expect(distanceSum(m, n, k)).toBe(byBruteForce(m, n, k));
	});
});
