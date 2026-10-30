import { describe, expect, it } from "bun:test";
import { colorTheTriangleRed as colorRed } from ".";

/** Spreads red until nothing changes and reports whether it covers everything. */
const coversAll = (n: number, start: number[][]): boolean => {
	const red = new Set(start.map(([i, j]) => `${i},${j}`));
	const neighbours = (i: number, j: number): [number, number][] => {
		const result: [number, number][] = [];
		if (j > 1) result.push([i, j - 1]);
		if (j < 2 * i - 1) result.push([i, j + 1]);
		if (j % 2 === 1 && i < n) result.push([i + 1, j + 1]);
		if (j % 2 === 0) result.push([i - 1, j - 1]);
		return result;
	};
	for (let changed = true; changed; ) {
		changed = false;
		for (let i = 1; i <= n; i++)
			for (let j = 1; j < 2 * i; j++)
				if (
					!red.has(`${i},${j}`) &&
					neighbours(i, j).filter(([a, b]) => red.has(`${a},${b}`)).length >= 2
				) {
					red.add(`${i},${j}`);
					changed = true;
				}
	}
	return red.size === n * n;
};

/** The smallest starting set that covers everything, by trying all sizes. */
const smallestSize = (n: number): number => {
	const cells: number[][] = [];
	for (let i = 1; i <= n; i++)
		for (let j = 1; j < 2 * i; j++) cells.push([i, j]);
	let best = cells.length;
	for (let mask = 0; mask < 1 << cells.length; mask++) {
		const size = mask.toString(2).replaceAll("0", "").length;
		if (size >= best) continue;
		if (
			coversAll(
				n,
				cells.filter((_, k) => (mask >> k) & 1),
			)
		)
			best = size;
	}
	return best;
};

describe("2647. Color the Triangle Red", () => {
	it("solves the examples from the problem statement", () => {
		expect(colorRed(1)).toEqual([[1, 1]]);
		expect(colorRed(2)).toEqual([
			[1, 1],
			[2, 1],
			[2, 3],
		]);
		expect(colorRed(3)).toHaveLength(5);
		expect(coversAll(3, colorRed(3))).toBe(true);
	});

	it("covers the triangle with as few as possible for small sizes", () => {
		for (let n = 1; n <= 4; n++) {
			expect(coversAll(n, colorRed(n))).toBe(true);
			expect(colorRed(n)).toHaveLength(smallestSize(n));
		}
	});

	it("covers larger triangles", () => {
		for (let n = 5; n <= 30; n++) expect(coversAll(n, colorRed(n))).toBe(true);
	});
});
