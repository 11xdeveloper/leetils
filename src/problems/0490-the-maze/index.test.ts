import { describe, expect, it } from "bun:test";
import { randomMaze, roll } from "../../testing/mazes";
import { createRandom } from "../../testing/random";
import { theMaze as hasPath } from ".";

/** Grows the set of stopping cells until nothing new is reached. */
const byFixpoint = (
	maze: number[][],
	start: number[],
	destination: number[],
): boolean => {
	const stops = new Set([start.join()]);
	for (let changed = true; changed; ) {
		changed = false;
		for (const stop of [...stops]) {
			const [row = 0, col = 0] = stop.split(",").map(Number);
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const [r, c] = roll(maze, row, col, dr, dc);
				if (!stops.has(`${r},${c}`)) {
					stops.add(`${r},${c}`);
					changed = true;
				}
			}
		}
	}
	return stops.has(destination.join());
};

const maze = [
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0],
	[1, 1, 0, 1, 1],
	[0, 0, 0, 0, 0],
];

describe("490. The Maze", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasPath(maze, [0, 4], [4, 4])).toBeTrue();
		expect(hasPath(maze, [0, 4], [3, 2])).toBeFalse();
		expect(
			hasPath(
				[
					[0, 0, 0, 0, 0],
					[1, 1, 0, 0, 1],
					[0, 0, 0, 0, 0],
					[0, 1, 0, 0, 1],
					[0, 1, 0, 0, 0],
				],
				[4, 3],
				[0, 1],
			),
		).toBeFalse();
	});

	it("matches growing the set of stops on random mazes", () => {
		const random = createRandom(490);
		for (let run = 0; run < 500; run++) {
			const generated = randomMaze(random, 6, 6);
			if (!generated) continue;
			const { maze, start, end } = generated;
			expect(hasPath(maze, start, end)).toBe(byFixpoint(maze, start, end));
		}
	});
});
