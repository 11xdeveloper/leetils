import { describe, expect, it } from "bun:test";
import { findMinimumTimeToReachLastRoomII as minTimeToReach } from ".";

describe("3342. Find Minimum Time to Reach Last Room II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minTimeToReach([
				[0, 4],
				[4, 4],
			]),
		).toBe(7);
		expect(
			minTimeToReach([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			]),
		).toBe(6);
		expect(
			minTimeToReach([
				[0, 1],
				[1, 2],
			]),
		).toBe(4);
	});
});
