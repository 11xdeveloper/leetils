import { describe, expect, it } from "bun:test";
import { checkIfTheRectangleCornerIsReachable as canReachCorner } from ".";

describe("3235. Check if the Rectangle Corner Is Reachable", () => {
	it("solves the examples from the problem statement", () => {
		expect(canReachCorner(3, 4, [[2, 1, 1]])).toBeTrue();
		expect(canReachCorner(3, 3, [[1, 1, 2]])).toBeFalse();
		expect(
			canReachCorner(3, 3, [
				[2, 1, 1],
				[1, 2, 1],
			]),
		).toBeFalse();
		expect(canReachCorner(4, 4, [[5, 5, 1]])).toBeTrue();
	});

	it("ignores circles that only meet outside the rectangle", () => {
		expect(
			canReachCorner(3, 3, [
				[5, 1, 2],
				[1, 5, 2],
				[5, 5, 2],
			]),
		).toBeTrue();
	});

	it("is blocked by a wall of circles across the rectangle", () => {
		expect(
			canReachCorner(10, 10, [
				[0, 5, 3],
				[5, 5, 3],
				[10, 5, 3],
			]),
		).toBeFalse();
	});

	it("handles huge coordinates exactly", () => {
		expect(canReachCorner(1e9, 1e9, [[1e9, 1e9, 1]])).toBeFalse();
		expect(canReachCorner(1e9, 1e9, [[5e8, 5e8, 1]])).toBeTrue();
	});
});
