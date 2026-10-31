import { describe, expect, it } from "bun:test";
import { parallelCoursesIII as minimumTime } from ".";

describe("2050. Parallel Courses III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumTime(
				3,
				[
					[1, 3],
					[2, 3],
				],
				[3, 2, 5],
			),
		).toBe(8);
		expect(
			minimumTime(
				5,
				[
					[1, 5],
					[2, 5],
					[3, 5],
					[3, 4],
					[4, 5],
				],
				[1, 2, 3, 4, 5],
			),
		).toBe(12);
	});

	it("runs unrelated courses in parallel", () => {
		expect(minimumTime(3, [], [4, 9, 2])).toBe(9);
	});
});
