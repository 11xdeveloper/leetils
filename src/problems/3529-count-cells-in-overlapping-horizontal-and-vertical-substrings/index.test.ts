import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countCellsInOverlappingHorizontalAndVerticalSubstrings as countCells } from ".";

/** Checks every start in both readings. */
const byBruteForce = (grid: string[][], pattern: string): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const rows = grid.map((r) => r.join("")).join("");
	let cols = "";
	for (let c = 0; c < n; c++)
		for (let r = 0; r < m; r++) cols += grid[r]?.[c] ?? "";
	const mark = (text: string) => {
		const marks = new Array<boolean>(text.length).fill(false);
		for (let i = 0; i + pattern.length <= text.length; i++)
			if (text.startsWith(pattern, i))
				for (let j = i; j < i + pattern.length; j++) marks[j] = true;
		return marks;
	};
	const h = mark(rows);
	const v = mark(cols);
	let count = 0;
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) if (h[r * n + c] && v[c * m + r]) count++;
	return count;
};

describe("3529. Count Cells in Overlapping Horizontal and Vertical Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countCells(
				[
					["a", "a", "c", "c"],
					["b", "b", "b", "c"],
					["a", "a", "b", "a"],
					["c", "a", "a", "c"],
					["a", "a", "b", "a"],
				],
				"abaca",
			),
		).toBe(1);
		expect(
			countCells(
				[
					["c", "a", "a", "a"],
					["a", "a", "b", "a"],
					["b", "b", "a", "a"],
					["a", "a", "b", "a"],
				],
				"aba",
			),
		).toBe(4);
		expect(countCells([["a"]], "a")).toBe(1);
	});

	it("matches checking every start on random grids", () => {
		const random = createRandom(3529);
		for (let run = 0; run < 200; run++) {
			const grid = Array.from({ length: random.int(1, 4) }, () => [
				...random.string(4, "ab"),
			]);
			const pattern = random.string(random.int(1, 4), "ab");
			expect(countCells(grid, pattern)).toBe(byBruteForce(grid, pattern));
		}
	});
});
