import { describe, expect, it } from "bun:test";
import { minimumTimeToReachDestinationInDirectedGraph as minTime } from ".";

describe("3604. Minimum Time to Reach Destination in Directed Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minTime(3, [
				[0, 1, 0, 1],
				[1, 2, 2, 5],
			]),
		).toBe(3);
		expect(
			minTime(4, [
				[0, 1, 0, 3],
				[1, 3, 7, 8],
				[0, 2, 1, 5],
				[2, 3, 4, 7],
			]),
		).toBe(5);
		expect(
			minTime(3, [
				[1, 0, 1, 3],
				[1, 2, 3, 5],
			]),
		).toBe(-1);
	});

	it("needs no time when already there", () => {
		expect(minTime(1, [])).toBe(0);
	});
});
