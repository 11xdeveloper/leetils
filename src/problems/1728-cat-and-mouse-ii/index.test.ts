import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { catAndMouseII as canMouseWin } from ".";

/** Grows the set of Mouse-winning states until nothing changes. */
const byBruteForce = (
	grid: string[],
	catJump: number,
	mouseJump: number,
): boolean => {
	const [rows, cols] = [grid.length, grid[0]?.length ?? 0];
	const find = (char: string) => {
		const index = grid.join("").indexOf(char);
		return [Math.floor(index / cols), index % cols] as const;
	};
	const moves = (
		[r, c]: readonly [number, number],
		jump: number,
	): [number, number][] => {
		const result: [number, number][] = [[r, c]];
		for (const [dr, dc] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		] as const) {
			for (let step = 1; step <= jump; step++) {
				const [nr, nc] = [r + dr * step, c + dc * step];
				if (
					nr < 0 ||
					nr >= rows ||
					nc < 0 ||
					nc >= cols ||
					grid[nr]?.[nc] === "#"
				)
					break;
				result.push([nr, nc]);
			}
		}
		return result;
	};
	const food = find("F");
	const key = (m: readonly number[], c: readonly number[], turn: number) =>
		`${m}|${c}|${turn}`;
	const mouseWins = new Set<string>();
	const open: [readonly [number, number], readonly [number, number]][] = [];
	for (let mr = 0; mr < rows; mr++)
		for (let mc = 0; mc < cols; mc++)
			for (let cr = 0; cr < rows; cr++)
				for (let cc = 0; cc < cols; cc++) {
					if (grid[mr]?.[mc] !== "#" && grid[cr]?.[cc] !== "#")
						open.push([
							[mr, mc],
							[cr, cc],
						]);
				}
	const same = (a: readonly number[], b: readonly number[]) =>
		a[0] === b[0] && a[1] === b[1];
	for (let changed = true; changed; ) {
		changed = false;
		for (const [m, c] of open) {
			for (const turn of [0, 1]) {
				const k = key(m, c, turn);
				if (mouseWins.has(k) || same(m, c) || same(c, food)) continue;
				const wins = same(m, food)
					? true
					: turn === 0
						? moves(m, mouseJump).some((next) => mouseWins.has(key(next, c, 1)))
						: moves(c, catJump).every((next) => mouseWins.has(key(m, next, 0)));
				if (wins) {
					mouseWins.add(k);
					changed = true;
				}
			}
		}
	}
	return mouseWins.has(key(find("M"), find("C"), 0));
};

describe("1728. Cat and Mouse II", () => {
	it("solves the examples from the problem statement", () => {
		expect(canMouseWin(["####F", "#C...", "M...."], 1, 2)).toBeTrue();
		expect(canMouseWin(["M.C...F"], 1, 4)).toBeTrue();
		expect(canMouseWin(["M.C...F"], 1, 3)).toBeFalse();
		expect(canMouseWin(["C...#", "...#F", "....#", "M...."], 2, 5)).toBeFalse();
	});

	it("matches growing the winning states on random grids", () => {
		const random = createRandom(1728);
		for (let run = 0; run < 60; run++) {
			const [rows, cols] = [random.int(1, 3), random.int(3, 4)];
			const cells = Array.from({ length: rows * cols }, (): string =>
				random.int(0, 4) === 0 ? "#" : ".",
			);
			const spots = new Set<number>();
			while (spots.size < 3) spots.add(random.int(0, rows * cols - 1));
			const [m, c, f] = [...spots];
			cells[m ?? 0] = "M";
			cells[c ?? 0] = "C";
			cells[f ?? 0] = "F";
			const grid = Array.from({ length: rows }, (_, r) =>
				cells.slice(r * cols, (r + 1) * cols).join(""),
			);
			const [catJump, mouseJump] = [random.int(1, 3), random.int(1, 3)];
			expect(canMouseWin(grid, catJump, mouseJump)).toBe(
				byBruteForce(grid, catJump, mouseJump),
			);
		}
	});
});
