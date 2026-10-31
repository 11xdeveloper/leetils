import { describe, expect, it } from "bun:test";
import { sortTheStudentsByTheirKthScore as sortTheStudents } from ".";

describe("2545. Sort the Students by Their Kth Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sortTheStudents(
				[
					[10, 6, 9, 1],
					[7, 5, 11, 2],
					[4, 8, 3, 15],
				],
				2,
			),
		).toEqual([
			[7, 5, 11, 2],
			[10, 6, 9, 1],
			[4, 8, 3, 15],
		]);
		expect(
			sortTheStudents(
				[
					[3, 4],
					[5, 6],
				],
				0,
			),
		).toEqual([
			[5, 6],
			[3, 4],
		]);
	});
});
