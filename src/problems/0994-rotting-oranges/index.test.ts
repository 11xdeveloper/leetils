import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rottingOranges as orangesRotting } from ".";

/** Simulates minute by minute. */
const bySimulation = (grid: number[][]): number => {
	let state = grid.map((row) => [...row]);
	for (let minute = 0; ; minute++) {
		if (!state.flat().includes(1)) return minute;
		const next = state.map((row, r) =>
			row.map((cell, c) =>
				cell === 1 &&
				[
					[-1, 0],
					[1, 0],
					[0, -1],
					[0, 1],
				].some(([dr = 0, dc = 0]) => state[r + dr]?.[c + dc] === 2)
					? 2
					: cell,
			),
		);
		if (JSON.stringify(next) === JSON.stringify(state)) return -1;
		state = next;
	}
};

describe("994. Rotting Oranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			orangesRotting([
				[2, 1, 1],
				[1, 1, 0],
				[0, 1, 1],
			]),
		).toBe(4);
		expect(
			orangesRotting([
				[2, 1, 1],
				[0, 1, 1],
				[1, 0, 1],
			]),
		).toBe(-1);
		expect(orangesRotting([[0, 2]])).toBe(0);
	});

	it("matches simulating each minute on random grids", () => {
		const random = createRandom(994);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 6);
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				random.array(cols, 0, 2),
			);
			expect(orangesRotting(grid)).toBe(bySimulation(grid));
		}
	});
});
