import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfPeopleThatCanBeSeenInAGrid as seePeople } from ".";

/** Checks every pair along each row and column. */
const byBruteForce = (heights: number[][]): number[][] =>
	heights.map((row, r) =>
		row.map((h, c) => {
			let count = 0;
			const lines = [
				row.slice(c + 1),
				heights.slice(r + 1).map((other) => other[c] ?? 0),
			];
			for (const line of lines) {
				for (const [k, other] of line.entries()) {
					const between = line.slice(0, k);
					if (between.every((b) => b < Math.min(h, other))) count++;
				}
			}
			return count;
		}),
	);

describe("2282. Number of People That Can Be Seen in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(seePeople([[3, 1, 4, 2, 5]])).toEqual([[2, 1, 2, 1, 0]]);
		expect(
			seePeople([
				[5, 1],
				[3, 1],
				[4, 1],
			]),
		).toEqual([
			[3, 1],
			[2, 1],
			[1, 0],
		]);
	});

	it("matches checking every pair on random grids", () => {
		const random = createRandom(2282);
		for (let run = 0; run < 200; run++) {
			const cols = random.int(1, 6);
			const heights = Array.from({ length: random.int(1, 6) }, () =>
				random.array(cols, 1, 4),
			);
			expect(seePeople(heights)).toEqual(byBruteForce(heights));
		}
	});
});
