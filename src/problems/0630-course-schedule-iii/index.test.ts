import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { courseScheduleIII as scheduleCourse } from ".";

/** Tries every subset; a subset works if taking it in deadline order meets every deadline. */
const byBruteForce = (courses: number[][]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << courses.length; mask++) {
		const chosen = courses
			.filter((_, i) => mask & (1 << i))
			.sort((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
		let time = 0;
		const feasible = chosen.every(([duration = 0, lastDay = 0]) => {
			time += duration;
			return time <= lastDay;
		});
		if (feasible) best = Math.max(best, chosen.length);
	}
	return best;
};

describe("630. Course Schedule III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			scheduleCourse([
				[100, 200],
				[200, 1300],
				[1000, 1250],
				[2000, 3200],
			]),
		).toBe(3);
		expect(scheduleCourse([[1, 2]])).toBe(1);
		expect(
			scheduleCourse([
				[3, 2],
				[4, 3],
			]),
		).toBe(0);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(630);
		for (let run = 0; run < 500; run++) {
			const courses = Array.from({ length: random.int(1, 9) }, () => [
				random.int(1, 6),
				random.int(1, 15),
			]);
			expect(scheduleCourse(courses)).toBe(byBruteForce(courses));
		}
	});
});
