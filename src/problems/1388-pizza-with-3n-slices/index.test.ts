import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pizzaWith3nSlices as maxSizeSlices } from ".";

/** Plays out every sequence of picks. */
const byBruteForce = (slices: number[]): number => {
	if (slices.length === 0) return 0;
	let best = 0;
	const n = slices.length;
	for (let i = 0; i < n; i++) {
		const removed = new Set([i, (i + 1) % n, (i - 1 + n) % n]);
		best = Math.max(
			best,
			(slices[i] ?? 0) + byBruteForce(slices.filter((_, j) => !removed.has(j))),
		);
	}
	return best;
};

describe("1388. Pizza With 3n Slices", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSizeSlices([1, 2, 3, 4, 5, 6])).toBe(10);
		expect(maxSizeSlices([8, 9, 8, 6, 1, 1])).toBe(16);
	});

	it("handles three slices", () => {
		expect(maxSizeSlices([4, 1, 2])).toBe(4);
	});

	it("matches playing out every pick on random pizzas", () => {
		const random = createRandom(1388);
		for (let run = 0; run < 150; run++) {
			const slices = random.array(3 * random.int(1, 3), 1, 20);
			expect(maxSizeSlices(slices)).toBe(byBruteForce(slices));
		}
	});
});
