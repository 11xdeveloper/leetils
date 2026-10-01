import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theNumberOfTheSmallestUnoccupiedChair as smallestChair } from ".";

/** Simulates with an array of chair occupants. */
const bySimulation = (times: number[][], target: number): number => {
	const leavesAt: number[] = [];
	const order = times
		.map((_, i) => i)
		.sort((a, b) => (times[a]?.[0] ?? 0) - (times[b]?.[0] ?? 0));
	for (const friend of order) {
		const [arrival = 0, leaving = 0] = times[friend] ?? [];
		let chair = 0;
		while ((leavesAt[chair] ?? -Infinity) > arrival) chair++;
		if (friend === target) return chair;
		leavesAt[chair] = leaving;
	}
	return -1;
};

describe("1942. The Number of the Smallest Unoccupied Chair", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			smallestChair(
				[
					[1, 4],
					[2, 3],
					[4, 6],
				],
				1,
			),
		).toBe(1);
		expect(
			smallestChair(
				[
					[3, 10],
					[1, 5],
					[2, 6],
				],
				0,
			),
		).toBe(2);
	});

	it("matches a chair-by-chair simulation on random inputs", () => {
		const random = createRandom(1942);
		for (let run = 0; run < 200; run++) {
			const arrivals = [...new Set(random.array(random.int(1, 10), 1, 30))];
			const times = arrivals.map((arrival) => [
				arrival,
				arrival + random.int(1, 10),
			]);
			const target = random.int(0, times.length - 1);
			expect(smallestChair(times, target)).toBe(bySimulation(times, target));
		}
	});
});
