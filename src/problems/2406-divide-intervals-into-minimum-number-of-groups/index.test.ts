import { describe, expect, it } from "bun:test";
import { divideIntervalsIntoMinimumNumberOfGroups as minGroups } from ".";

describe("2406. Divide Intervals Into Minimum Number of Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minGroups([
				[5, 10],
				[6, 8],
				[1, 5],
				[2, 3],
				[1, 10],
			]),
		).toBe(3);
		expect(
			minGroups([
				[1, 3],
				[5, 6],
				[8, 10],
				[11, 13],
			]),
		).toBe(1);
	});
});
