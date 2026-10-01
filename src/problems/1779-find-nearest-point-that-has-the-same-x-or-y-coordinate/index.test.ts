import { describe, expect, it } from "bun:test";
import { findNearestPointThatHasTheSameXOrYCoordinate as nearestValidPoint } from ".";

describe("1779. Find Nearest Point That Has the Same X or Y Coordinate", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			nearestValidPoint(3, 4, [
				[1, 2],
				[3, 1],
				[2, 4],
				[2, 3],
				[4, 4],
			]),
		).toBe(2);
		expect(nearestValidPoint(3, 4, [[3, 4]])).toBe(0);
		expect(nearestValidPoint(3, 4, [[2, 3]])).toBe(-1);
	});
});
