import { describe, expect, it } from "bun:test";
import { numberOfWaysToEarnPoints as waysToReachTarget } from ".";

describe("2585. Number of Ways to Earn Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			waysToReachTarget(6, [
				[6, 1],
				[3, 2],
				[2, 3],
			]),
		).toBe(7);
		expect(
			waysToReachTarget(5, [
				[50, 1],
				[50, 2],
				[50, 5],
			]),
		).toBe(4);
		expect(
			waysToReachTarget(18, [
				[6, 1],
				[3, 2],
				[2, 3],
			]),
		).toBe(1);
	});
});
