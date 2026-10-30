import { describe, expect, it } from "bun:test";
import { theEmployeeThatWorkedOnTheLongestTask as hardestWorker } from ".";

describe("2432. The Employee That Worked on the Longest Task", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			hardestWorker(10, [
				[0, 3],
				[2, 5],
				[0, 9],
				[1, 15],
			]),
		).toBe(1);
		expect(
			hardestWorker(26, [
				[1, 1],
				[3, 7],
				[2, 12],
				[7, 17],
			]),
		).toBe(3);
		expect(
			hardestWorker(2, [
				[0, 10],
				[1, 20],
			]),
		).toBe(0);
	});
});
