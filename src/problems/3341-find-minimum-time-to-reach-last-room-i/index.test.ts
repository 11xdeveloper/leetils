import { describe, expect, it } from "bun:test";
import { findMinimumTimeToReachLastRoomI as minTimeToReach } from ".";

describe("3341. Find Minimum Time to Reach Last Room I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minTimeToReach([
				[0, 4],
				[4, 4],
			]),
		).toBe(6);
		expect(
			minTimeToReach([
				[0, 0, 0],
				[0, 0, 0],
			]),
		).toBe(3);
		expect(
			minTimeToReach([
				[0, 1],
				[1, 2],
			]),
		).toBe(3);
	});
});
