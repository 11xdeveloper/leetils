import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeGridHappiness as getMaxGridHappiness } from ".";

/** Tries every assignment of empty, introvert or extrovert to each cell. */
const byBruteForce = (
	m: number,
	n: number,
	introverts: number,
	extroverts: number,
): number => {
	let best = 0;
	for (let code = 0; code < 3 ** (m * n); code++) {
		const grid = Array.from(
			{ length: m * n },
			(_, i) => Math.floor(code / 3 ** i) % 3,
		);
		if (
			grid.filter((t) => t === 1).length > introverts ||
			grid.filter((t) => t === 2).length > extroverts
		)
			continue;
		let total = 0;
		for (let i = 0; i < m * n; i++) {
			const type = grid[i] ?? 0;
			if (type === 0) continue;
			const [r, c] = [Math.floor(i / n), i % n];
			const neighbours = [
				r > 0 ? grid[i - n] : 0,
				r < m - 1 ? grid[i + n] : 0,
				c > 0 ? grid[i - 1] : 0,
				c < n - 1 ? grid[i + 1] : 0,
			].filter((t) => t !== 0).length;
			total += type === 1 ? 120 - 30 * neighbours : 40 + 20 * neighbours;
		}
		best = Math.max(best, total);
	}
	return best;
};

describe("1659. Maximize Grid Happiness", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMaxGridHappiness(2, 3, 1, 2)).toBe(240);
		expect(getMaxGridHappiness(3, 1, 2, 1)).toBe(260);
		expect(getMaxGridHappiness(2, 2, 4, 0)).toBe(240);
	});

	it("matches trying every grid on small inputs", () => {
		const random = createRandom(1659);
		for (let run = 0; run < 40; run++) {
			const [m, n] = [random.int(1, 3), random.int(1, 3)];
			const [introverts, extroverts] = [random.int(0, 4), random.int(0, 4)];
			expect(getMaxGridHappiness(m, n, introverts, extroverts)).toBe(
				byBruteForce(m, n, introverts, extroverts),
			);
		}
	});

	it("handles the largest grid", () => {
		expect(getMaxGridHappiness(5, 5, 6, 6)).toBeGreaterThan(0);
	});
});
