import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGameV } from ".";

/** Plays every split recursively on explicit subarrays. */
const byBruteForce = (row: number[]): number => {
	if (row.length <= 1) return 0;
	let best = 0;
	for (let k = 1; k < row.length; k++) {
		const [left, right] = [row.slice(0, k), row.slice(k)];
		const [a, b] = [
			left.reduce((s, x) => s + x, 0),
			right.reduce((s, x) => s + x, 0),
		];
		if (a < b) best = Math.max(best, a + byBruteForce(left));
		else if (a > b) best = Math.max(best, b + byBruteForce(right));
		else best = Math.max(best, a + byBruteForce(left), b + byBruteForce(right));
	}
	return best;
};

describe("1563. Stone Game V", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGameV([6, 2, 3, 4, 5, 5])).toBe(18);
		expect(stoneGameV([7, 7, 7, 7, 7, 7, 7])).toBe(28);
		expect(stoneGameV([4])).toBe(0);
	});

	it("matches playing every split on random rows", () => {
		const random = createRandom(1563);
		for (let run = 0; run < 150; run++) {
			const row = random.array(random.int(1, 8), 1, 6);
			expect(stoneGameV(row)).toBe(byBruteForce(row));
		}
	});
});
