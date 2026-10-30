import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { paintingTheWalls as paintWalls } from ".";

/** Tries every set of walls for the paid painter. */
const byBruteForce = (cost: number[], time: number[]): number => {
	const n = cost.length;
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 1; mask < 1 << n; mask++) {
		let paid = 0;
		let busy = 0;
		let walls = 0;
		for (let i = 0; i < n; i++)
			if ((mask >> i) & 1) {
				paid += cost[i] ?? 0;
				busy += time[i] ?? 0;
				walls++;
			}
		if (walls + busy >= n) best = Math.min(best, paid);
	}
	return best;
};

describe("2742. Painting the Walls", () => {
	it("solves the examples from the problem statement", () => {
		expect(paintWalls([1, 2, 3, 2], [1, 2, 3, 2])).toBe(3);
		expect(paintWalls([2, 3, 4, 2], [1, 1, 1, 1])).toBe(4);
	});

	it("matches trying every set of paid walls on random inputs", () => {
		const random = createRandom(2742);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const cost = random.array(n, 1, 20);
			const time = random.array(n, 1, 4);
			expect(paintWalls(cost, time)).toBe(byBruteForce(cost, time));
		}
	});
});
