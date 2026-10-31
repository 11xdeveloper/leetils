import { describe, expect, it } from "bun:test";
import { findPolygonWithTheLargestPerimeter as largestPerimeter } from ".";

describe("2971. Find Polygon With the Largest Perimeter", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestPerimeter([5, 5, 5])).toBe(15);
		expect(largestPerimeter([1, 12, 1, 2, 5, 50, 3])).toBe(12);
		expect(largestPerimeter([5, 5, 50])).toBe(-1);
	});
});
