import { describe, expect, it } from "bun:test";
import { paintingAGridWithThreeDifferentColors as colorTheGrid } from ".";

/** Tries every colouring of small grids. */
const byBruteForce = (m: number, n: number): number => {
	let count = 0;
	for (let code = 0; code < 3 ** (m * n); code++) {
		const color = (r: number, c: number) =>
			Math.floor(code / 3 ** (r * n + c)) % 3;
		let valid = true;
		for (let r = 0; r < m && valid; r++) {
			for (let c = 0; c < n && valid; c++) {
				if (
					(r > 0 && color(r - 1, c) === color(r, c)) ||
					(c > 0 && color(r, c - 1) === color(r, c))
				)
					valid = false;
			}
		}
		if (valid) count++;
	}
	return count;
};

describe("1931. Painting a Grid With Three Different Colors", () => {
	it("solves the examples from the problem statement", () => {
		expect(colorTheGrid(1, 1)).toBe(3);
		expect(colorTheGrid(1, 2)).toBe(6);
		expect(colorTheGrid(5, 5)).toBe(580986);
	});

	it("matches trying every colouring of small grids", () => {
		for (let m = 1; m <= 3; m++)
			for (let n = 1; n <= 3; n++)
				expect(colorTheGrid(m, n)).toBe(byBruteForce(m, n));
	});

	it("handles the largest grid", () => {
		expect(colorTheGrid(5, 1000)).toBeLessThan(1_000_000_007);
	});
});
