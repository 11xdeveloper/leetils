import { describe, expect, it } from "bun:test";
import { timeToCrossABridge as findCrossingTime } from ".";

describe("2532. Time to Cross a Bridge", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findCrossingTime(1, 3, [
				[1, 1, 2, 1],
				[1, 1, 3, 1],
				[1, 1, 4, 1],
			]),
		).toBe(6);
		expect(
			findCrossingTime(3, 2, [
				[1, 5, 1, 8],
				[10, 10, 10, 10],
			]),
		).toBe(37);
	});
});
