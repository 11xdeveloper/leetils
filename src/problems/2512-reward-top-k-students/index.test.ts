import { describe, expect, it } from "bun:test";
import { rewardTopKStudents as topStudents } from ".";

describe("2512. Reward Top K Students", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			topStudents(
				["smart", "brilliant", "studious"],
				["not"],
				["this student is studious", "the student is smart"],
				[1, 2],
				2,
			),
		).toEqual([1, 2]);
		expect(
			topStudents(
				["smart", "brilliant", "studious"],
				["not"],
				["this student is not studious", "the student is smart"],
				[1, 2],
				2,
			),
		).toEqual([2, 1]);
	});
});
