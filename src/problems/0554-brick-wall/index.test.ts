import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { brickWall as leastBricks } from ".";

/** Tries a line at every position strictly inside the wall. */
const byBruteForce = (wall: number[][]): number => {
	const width = (wall[0] ?? []).reduce((sum, brick) => sum + brick, 0);
	let best = wall.length;
	for (let x = 1; x < width; x++) {
		const crossed = wall.filter((row) => {
			let position = 0;
			for (const brick of row) {
				position += brick;
				if (position === x) return false;
			}
			return true;
		}).length;
		best = Math.min(best, crossed);
	}
	return best;
};

describe("554. Brick Wall", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			leastBricks([
				[1, 2, 2, 1],
				[3, 1, 2],
				[1, 3, 2],
				[2, 4],
				[3, 1, 2],
				[1, 3, 1, 1],
			]),
		).toBe(2);
		expect(leastBricks([[1], [1], [1]])).toBe(3);
	});

	it("matches trying every position on random walls", () => {
		const random = createRandom(554);
		for (let run = 0; run < 500; run++) {
			const width = random.int(1, 10);
			const wall = Array.from({ length: random.int(1, 6) }, () => {
				const row: number[] = [];
				for (let left = width; left > 0; ) {
					const brick = random.int(1, left);
					row.push(brick);
					left -= brick;
				}
				return row;
			});
			expect(leastBricks(wall)).toBe(byBruteForce(wall));
		}
	});
});
