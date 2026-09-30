import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfThereIsAValidPathInAGrid as hasValidPath } from ".";

/**
 * Draws each street on a grid three times finer, as a path from the cell's
 * centre to the midpoints of its open sides, then floods the drawing.
 */
const byBruteForce = (grid: number[][]): boolean => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const sides: Record<number, string> = {
		1: "LR",
		2: "UD",
		3: "LD",
		4: "RD",
		5: "LU",
		6: "RU",
	};
	const offsets: Record<string, [number, number]> = {
		L: [0, -1],
		R: [0, 1],
		U: [-1, 0],
		D: [1, 0],
	};
	const drawn = new Set<string>();
	grid.forEach((row, r) => {
		row.forEach((street, c) => {
			const [cr, cc] = [3 * r + 1, 3 * c + 1];
			drawn.add(`${cr},${cc}`);
			for (const side of sides[street] ?? "") {
				const [dr, dc] = offsets[side] ?? [0, 0];
				drawn.add(`${cr + dr},${cc + dc}`);
			}
		});
	});
	// Sides of neighbouring cells meet only if both are drawn next to each other.
	const seen = new Set(["1,1"]);
	const stack = [[1, 1]];
	for (let at = stack.pop(); at; at = stack.pop()) {
		const [r = 0, c = 0] = at;
		for (const [r2, c2] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			const key = `${r2},${c2}`;
			if (!drawn.has(key) || seen.has(key)) continue;
			seen.add(key);
			stack.push([r2, c2]);
		}
	}
	return seen.has(`${3 * m - 2},${3 * n - 2}`);
};

describe("1391. Check if There is a Valid Path in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			hasValidPath([
				[2, 4, 3],
				[6, 5, 2],
			]),
		).toBeTrue();
		expect(
			hasValidPath([
				[1, 2, 1],
				[1, 2, 1],
			]),
		).toBeFalse();
		expect(hasValidPath([[1, 1, 2]])).toBeFalse();
	});

	it("handles a single cell", () => {
		expect(hasValidPath([[5]])).toBeTrue();
	});

	it("matches flooding a drawing of the streets on random grids", () => {
		const random = createRandom(1391);
		for (let run = 0; run < 300; run++) {
			const grid = Array.from({ length: random.int(1, 4) }, () =>
				random.array(4, 1, 6),
			);
			expect(hasValidPath(grid)).toBe(byBruteForce(grid));
		}
	});
});
