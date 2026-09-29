import { describe, expect, it } from "bun:test";
import { randomMaze, roll } from "../../testing/mazes";
import { createRandom } from "../../testing/random";
import { theMazeII as shortestDistance } from ".";

/** Bellman-Ford over the stopping cells: relax every roll until nothing improves. */
const byRelaxation = (
	maze: number[][],
	start: number[],
	destination: number[],
): number => {
	const distances = new Map([[start.join(), 0]]);
	for (let changed = true; changed; ) {
		changed = false;
		for (const [key, distance] of [...distances]) {
			const [row = 0, col = 0] = key.split(",").map(Number);
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const [r, c, rolled] = roll(maze, row, col, dr, dc);
				if (
					distance + rolled <
					(distances.get(`${r},${c}`) ?? Number.POSITIVE_INFINITY)
				) {
					distances.set(`${r},${c}`, distance + rolled);
					changed = true;
				}
			}
		}
	}
	return distances.get(destination.join()) ?? -1;
};

const maze = [
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0],
	[1, 1, 0, 1, 1],
	[0, 0, 0, 0, 0],
];

describe("505. The Maze II", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestDistance(maze, [0, 4], [4, 4])).toBe(12);
		expect(shortestDistance(maze, [0, 4], [3, 2])).toBe(-1);
		expect(
			shortestDistance(
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
		).toBe(-1);
	});

	it("matches relaxing every roll on random mazes", () => {
		const random = createRandom(505);
		for (let run = 0; run < 500; run++) {
			const generated = randomMaze(random, 6, 6);
			if (!generated) continue;
			const { maze, start, end } = generated;
			expect(shortestDistance(maze, start, end)).toBe(
				byRelaxation(maze, start, end),
			);
		}
	});
});
