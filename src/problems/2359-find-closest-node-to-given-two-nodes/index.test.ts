import { describe, expect, it } from "bun:test";
import { findClosestNodeToGivenTwoNodes as closestMeetingNode } from ".";

describe("2359. Find Closest Node to Given Two Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(closestMeetingNode([2, 2, 3, -1], 0, 1)).toBe(2);
		expect(closestMeetingNode([1, 2, -1], 0, 2)).toBe(2);
	});

	it("handles cycles and unreachable meetings", () => {
		expect(closestMeetingNode([1, 0], 0, 1)).toBe(0);
		expect(closestMeetingNode([-1, -1], 0, 1)).toBe(-1);
	});
});
