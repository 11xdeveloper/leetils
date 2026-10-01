import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lastDayWhereYouCanStillCross as latestDayToCross } from ".";

/** Checks each day with a breadth-first search over land. */
const byBruteForce = (row: number, col: number, cells: number[][]): number => {
	const crossable = (day: number) => {
		const water = new Set(cells.slice(0, day).map(([r, c]) => `${r},${c}`));
		const queue: [number, number][] = [];
		const seen = new Set<string>();
		for (let c = 1; c <= col; c++) {
			if (water.has(`1,${c}`)) continue;
			queue.push([1, c]);
			seen.add(`1,${c}`);
		}
		for (let head = 0; head < queue.length; head++) {
			const [r, c] = queue[head] ?? [1, 1];
			if (r === row) return true;
			for (const [nr, nc] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				const key = `${nr},${nc}`;
				if (
					nr < 1 ||
					nr > row ||
					nc < 1 ||
					nc > col ||
					water.has(key) ||
					seen.has(key)
				)
					continue;
				seen.add(key);
				queue.push([nr, nc]);
			}
		}
		return false;
	};
	let day = 0;
	while (day < cells.length && crossable(day + 1)) day++;
	return day;
};

describe("1970. Last Day Where You Can Still Cross", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			latestDayToCross(2, 2, [
				[1, 1],
				[2, 1],
				[1, 2],
				[2, 2],
			]),
		).toBe(2);
		expect(
			latestDayToCross(2, 2, [
				[1, 1],
				[1, 2],
				[2, 1],
				[2, 2],
			]),
		).toBe(1);
		expect(
			latestDayToCross(3, 3, [
				[1, 2],
				[2, 1],
				[3, 3],
				[2, 2],
				[1, 1],
				[1, 3],
				[2, 3],
				[3, 2],
				[3, 1],
			]),
		).toBe(3);
	});

	it("matches checking each day on random floods", () => {
		const random = createRandom(1970);
		for (let run = 0; run < 100; run++) {
			const [row, col] = [random.int(2, 5), random.int(2, 5)];
			const cells: number[][] = [];
			for (let r = 1; r <= row; r++)
				for (let c = 1; c <= col; c++) cells.push([r, c]);
			for (let i = cells.length - 1; i > 0; i--) {
				const j = random.int(0, i);
				[cells[i], cells[j]] = [cells[j] ?? [], cells[i] ?? []];
			}
			expect(latestDayToCross(row, col, cells)).toBe(
				byBruteForce(row, col, cells),
			);
		}
	});
});
