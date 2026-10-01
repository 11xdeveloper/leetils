import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { asteroidCollision } from ".";

/** Repeatedly resolves the first pair of neighbours moving towards each other. */
const bySimulation = (asteroids: number[]): number[] => {
	const row = [...asteroids];
	for (;;) {
		const i = row.findIndex((a, k) => a > 0 && (row[k + 1] ?? 0) < 0);
		if (i === -1) return row;
		const right = row[i] ?? 0;
		const left = -(row[i + 1] ?? 0);
		if (right === left) row.splice(i, 2);
		else if (right > left) row.splice(i + 1, 1);
		else row.splice(i, 1);
	}
};

describe("735. Asteroid Collision", () => {
	it("solves the examples from the problem statement", () => {
		expect(asteroidCollision([5, 10, -5])).toEqual([5, 10]);
		expect(asteroidCollision([8, -8])).toEqual([]);
		expect(asteroidCollision([10, 2, -5])).toEqual([10]);
	});

	it("matches resolving collisions one at a time on random inputs", () => {
		const random = createRandom(735);
		for (let run = 0; run < 1000; run++) {
			const asteroids = random
				.array(random.int(1, 12), -5, 5)
				.map((a) => a || 1);
			expect(asteroidCollision(asteroids)).toEqual(bySimulation(asteroids));
		}
	});
});
