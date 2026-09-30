import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMovesToReachTargetWithRotations as minimumMoves } from ".";

/** Searches over the snake's two cells, applying each move as the statement describes it. */
const byBruteForce = (grid: number[][]): number => {
	const n = grid.length;
	const free = (r: number, c: number) => grid[r]?.[c] === 0;
	type Snake = [number, number, number, number];
	const moves = ([r1, c1, r2, c2]: Snake): Snake[] => {
		const result: Snake[] = [];
		if (free(r1, c1 + 1) && free(r2, c2 + 1))
			result.push([r1, c1 + 1, r2, c2 + 1]);
		if (free(r1 + 1, c1) && free(r2 + 1, c2))
			result.push([r1 + 1, c1, r2 + 1, c2]);
		const horizontal = r1 === r2;
		if (horizontal && free(r1 + 1, c1) && free(r2 + 1, c2))
			result.push([r1, c1, r1 + 1, c1]);
		if (!horizontal && free(r1, c1 + 1) && free(r2, c2 + 1))
			result.push([r1, c1, r1, c1 + 1]);
		return result;
	};
	const goal = `${n - 1},${n - 2},${n - 1},${n - 1}`;
	const distance = new Map([["0,0,0,1", 0]]);
	const queue: Snake[] = [[0, 0, 0, 1]];
	for (let i = 0; i < queue.length; i++) {
		const snake = queue[i] ?? [0, 0, 0, 1];
		const d = distance.get(snake.join(",")) ?? 0;
		if (snake.join(",") === goal) return d;
		for (const next of moves(snake)) {
			if (distance.has(next.join(","))) continue;
			distance.set(next.join(","), d + 1);
			queue.push(next);
		}
	}
	return -1;
};

describe("1210. Minimum Moves to Reach Target with Rotations", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumMoves([
				[0, 0, 0, 0, 0, 1],
				[1, 1, 0, 0, 1, 0],
				[0, 0, 0, 0, 1, 1],
				[0, 0, 1, 0, 1, 0],
				[0, 1, 1, 0, 0, 0],
				[0, 1, 1, 0, 0, 0],
			]),
		).toBe(11);
		expect(
			minimumMoves([
				[0, 0, 1, 1, 1, 1],
				[0, 0, 0, 0, 1, 1],
				[1, 1, 0, 0, 0, 1],
				[1, 1, 1, 0, 0, 1],
				[1, 1, 1, 0, 0, 1],
				[1, 1, 1, 0, 0, 0],
			]),
		).toBe(9);
	});

	it("handles a 2 × 2 grid", () => {
		expect(
			minimumMoves([
				[0, 0],
				[0, 0],
			]),
		).toBe(1);
		expect(
			minimumMoves([
				[0, 0],
				[1, 0],
			]),
		).toBe(-1);
	});

	it("matches a search over the snake's cells on random grids", () => {
		const random = createRandom(1210);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 6);
			// The snake starts on the first two cells, so they're always empty.
			const grid = Array.from({ length: n }, (_, r) =>
				Array.from({ length: n }, (_, c): number =>
					r === 0 && c < 2 ? 0 : random.next() < 0.2 ? 1 : 0,
				),
			);
			expect(minimumMoves(grid)).toBe(byBruteForce(grid));
		}
	});
});
