import { describe, expect, it } from "bun:test";
import { rectangleOverlap as isRectangleOverlap } from ".";

describe("836. Rectangle Overlap", () => {
	it("solves the examples from the problem statement", () => {
		expect(isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3])).toBeTrue();
		expect(isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1])).toBeFalse();
		expect(isRectangleOverlap([0, 0, 1, 1], [2, 2, 3, 3])).toBeFalse();
	});

	it("counts containment as overlap", () => {
		expect(isRectangleOverlap([0, 0, 10, 10], [2, 2, 3, 3])).toBeTrue();
	});
});
