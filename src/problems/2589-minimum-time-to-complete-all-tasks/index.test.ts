import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToCompleteAllTasks as findMinimumTime } from ".";

/** Tries every set of on-seconds, smallest first. */
const byBruteForce = (tasks: number[][], horizon: number): number => {
	let best = horizon;
	for (let mask = 0; mask < 1 << horizon; mask++) {
		const fits = tasks.every(([start = 0, end = 0, duration = 0]) => {
			let covered = 0;
			for (let t = start; t <= end; t++) if ((mask >> (t - 1)) & 1) covered++;
			return covered >= duration;
		});
		if (fits)
			best = Math.min(best, mask.toString(2).replaceAll("0", "").length);
	}
	return best;
};

describe("2589. Minimum Time to Complete All Tasks", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMinimumTime([
				[2, 3, 1],
				[4, 5, 1],
				[1, 5, 2],
			]),
		).toBe(2);
		expect(
			findMinimumTime([
				[1, 3, 2],
				[2, 5, 3],
				[5, 6, 2],
			]),
		).toBe(4);
	});

	it("matches trying every schedule on random inputs", () => {
		const random = createRandom(2589);
		for (let run = 0; run < 200; run++) {
			const tasks = Array.from({ length: random.int(1, 5) }, () => {
				const start = random.int(1, 8);
				const end = random.int(start, 8);
				return [start, end, random.int(1, end - start + 1)];
			});
			expect(findMinimumTime(tasks)).toBe(byBruteForce(tasks, 8));
		}
	});
});
