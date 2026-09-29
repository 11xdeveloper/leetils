import { describe, expect, it } from "bun:test";
import { randomMaze, roll } from "../../testing/mazes";
import { createRandom } from "../../testing/random";
import { theMazeIII as findShortestWay } from ".";

/**
 * Tries every route that never stops at the same cell twice. A shortest
 * route never does, since cutting out the loop would make it shorter.
 */
const byBruteForce = (
	maze: number[][],
	ball: number[],
	hole: number[],
): string => {
	let best: [number, string] | undefined;
	const visited = new Set<string>();
	const search = (
		row: number,
		col: number,
		distance: number,
		path: string,
	): void => {
		if (row === hole[0] && col === hole[1]) {
			if (
				!best ||
				distance < best[0] ||
				(distance === best[0] && path < best[1])
			)
				best = [distance, path];
			return;
		}
		visited.add(`${row},${col}`);
		for (const [direction, dr, dc] of [
			["d", 1, 0],
			["l", 0, -1],
			["r", 0, 1],
			["u", -1, 0],
		] as const) {
			const [r, c, travelled] = roll(maze, row, col, dr, dc, hole);
			if (travelled > 0 && !visited.has(`${r},${c}`))
				search(r, c, distance + travelled, path + direction);
		}
		visited.delete(`${row},${col}`);
	};
	search(ball[0] ?? 0, ball[1] ?? 0, 0, "");
	return best?.[1] ?? "impossible";
};

const maze = [
	[0, 0, 0, 0, 0],
	[1, 1, 0, 0, 1],
	[0, 0, 0, 0, 0],
	[0, 1, 0, 0, 1],
	[0, 1, 0, 0, 0],
];

describe("499. The Maze III", () => {
	it("solves the examples from the problem statement", () => {
		expect(findShortestWay(maze, [4, 3], [0, 1])).toBe("lul");
		expect(findShortestWay(maze, [4, 3], [3, 0])).toBe("impossible");
		expect(
			findShortestWay(
				[
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 1, 0],
					[0, 0, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 0, 0, 1],
				],
				[0, 4],
				[3, 5],
			),
		).toBe("dldr");
	});

	it("matches trying every route on random mazes", () => {
		const random = createRandom(499);
		for (let run = 0; run < 500; run++) {
			const generated = randomMaze(random, 5, 5);
			if (!generated) continue;
			const { maze, start, end } = generated;
			expect(findShortestWay(maze, start, end)).toBe(
				byBruteForce(maze, start, end),
			);
		}
	});
});
