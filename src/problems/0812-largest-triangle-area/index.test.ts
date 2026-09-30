import { describe, expect, it } from "bun:test";
import { largestTriangleArea } from ".";

describe("812. Largest Triangle Area", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestTriangleArea([
				[0, 0],
				[0, 1],
				[1, 0],
				[0, 2],
				[2, 0],
			]),
		).toBe(2);
		expect(
			largestTriangleArea([
				[1, 0],
				[0, 0],
				[0, 1],
			]),
		).toBe(0.5);
	});

	it("gives 0 for points on a line", () => {
		expect(
			largestTriangleArea([
				[0, 0],
				[1, 1],
				[2, 2],
			]),
		).toBe(0);
	});
});
