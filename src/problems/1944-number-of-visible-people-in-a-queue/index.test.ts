import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfVisiblePeopleInAQueue as canSeePersonsCount } from ".";

describe("1944. Number of Visible People in a Queue", () => {
	it("solves the examples from the problem statement", () => {
		expect(canSeePersonsCount([10, 6, 8, 5, 11, 9])).toEqual([
			3, 1, 2, 1, 1, 0,
		]);
		expect(canSeePersonsCount([5, 1, 2, 3, 10])).toEqual([4, 1, 1, 1, 0]);
	});

	it("matches checking every pair on random queues", () => {
		const random = createRandom(1944);
		for (let run = 0; run < 200; run++) {
			const heights = [...new Set(random.array(random.int(1, 12), 1, 50))];
			const expected = heights.map((h, i) => {
				let count = 0;
				for (let j = i + 1; j < heights.length; j++) {
					const between = heights.slice(i + 1, j);
					if (between.every((b) => b < Math.min(h, heights[j] ?? 0))) count++;
				}
				return count;
			});
			expect(canSeePersonsCount(heights)).toEqual(expected);
		}
	});
});
