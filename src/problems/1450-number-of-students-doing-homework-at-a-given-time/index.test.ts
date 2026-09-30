import { describe, expect, it } from "bun:test";
import { numberOfStudentsDoingHomeworkAtAGivenTime as busyStudent } from ".";

describe("1450. Number of Students Doing Homework at a Given Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(busyStudent([1, 2, 3], [3, 2, 7], 4)).toBe(1);
		expect(busyStudent([4], [4], 4)).toBe(1);
	});

	it("includes both ends of each interval", () => {
		expect(busyStudent([1, 5, 9], [5, 9, 12], 5)).toBe(2);
	});
});
