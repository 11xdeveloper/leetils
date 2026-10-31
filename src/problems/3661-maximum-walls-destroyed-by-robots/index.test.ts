import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumWallsDestroyedByRobots as maxWalls } from ".";

/** Tries every set of directions. */
const byBruteForce = (
	robots: number[],
	distance: number[],
	walls: number[],
): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << robots.length; mask++) {
		const destroyed = new Set<number>();
		robots.forEach((p, i) => {
			const step = (mask >> i) & 1 ? 1 : -1;
			for (let x = p, d = 0; d <= (distance[i] ?? 0); x += step, d++) {
				if (d > 0 && robots.includes(x)) break;
				walls.forEach((w, j) => {
					if (w === x) destroyed.add(j);
				});
			}
		});
		best = Math.max(best, destroyed.size);
	}
	return best;
};

describe("3661. Maximum Walls Destroyed by Robots", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxWalls([4], [3], [1, 10])).toBe(1);
		expect(maxWalls([10, 2], [5, 1], [5, 2, 7])).toBe(3);
		expect(maxWalls([1, 2], [100, 1], [10])).toBe(0);
	});

	it("matches trying every direction on random input", () => {
		const random = createRandom(3661);
		for (let run = 0; run < 200; run++) {
			const pool = Array.from({ length: 20 }, (_, i) => i + 1);
			const robots = Array.from(
				{ length: random.int(1, 5) },
				() => pool.splice(random.int(0, pool.length - 1), 1)[0] ?? 0,
			);
			const distance = random.array(robots.length, 1, 6);
			const walls = [...new Set(random.array(random.int(1, 8), 1, 20))];
			expect(maxWalls(robots, distance, walls)).toBe(
				byBruteForce(robots, distance, walls),
			);
		}
	});
});
