import { describe, expect, it } from "bun:test";
import { theScoreOfStudentsSolvingMathExpression as scoreOfStudents } from ".";

describe("2019. The Score of Students Solving Math Expression", () => {
	it("solves the examples from the problem statement", () => {
		expect(scoreOfStudents("7+3*1*2", [20, 13, 42])).toBe(7);
		expect(scoreOfStudents("3+5*2", [13, 0, 10, 13, 13, 16, 16])).toBe(19);
		expect(scoreOfStudents("6+0*1", [12, 9, 6, 4, 8, 6])).toBe(10);
	});

	it("keeps values that pass through more than 1000 before a zero", () => {
		// 9*9*9*9*(0+1) = 6561 is too big to score, and no order gives 0.
		expect(scoreOfStudents("9*9*9*9*0+1", [1, 6561, 0])).toBe(5);
		// 1+9*9*9*9*0 = 1 correctly; (1+9*9*9*9)*0 = 0 needs a value over 1000.
		expect(scoreOfStudents("1+9*9*9*9*0", [0, 1])).toBe(7);
	});
});
