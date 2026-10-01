import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheLongestValidObstacleCourseAtEachPosition as longestObstacleCourseAtEachPosition } from ".";

describe("1964. Find the Longest Valid Obstacle Course at Each Position", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestObstacleCourseAtEachPosition([1, 2, 3, 2])).toEqual([
			1, 2, 3, 3,
		]);
		expect(longestObstacleCourseAtEachPosition([2, 2, 1])).toEqual([1, 2, 1]);
		expect(longestObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2])).toEqual([
			1, 1, 2, 3, 2, 2,
		]);
	});

	it("matches the quadratic dynamic program on random inputs", () => {
		const random = createRandom(1964);
		for (let run = 0; run < 300; run++) {
			const obstacles = random.array(random.int(1, 12), 1, 6);
			const expected: number[] = [];
			for (const [i, height] of obstacles.entries()) {
				let best = 1;
				for (let j = 0; j < i; j++)
					if ((obstacles[j] ?? 0) <= height)
						best = Math.max(best, (expected[j] ?? 0) + 1);
				expected.push(best);
			}
			expect(longestObstacleCourseAtEachPosition(obstacles)).toEqual(expected);
		}
	});
});
