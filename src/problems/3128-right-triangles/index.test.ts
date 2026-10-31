import { describe, expect, it } from "bun:test";
import { rightTriangles as numberOfRightTriangles } from ".";

describe("3128. Right Triangles", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfRightTriangles([
				[0, 1, 0],
				[0, 1, 1],
				[0, 1, 0],
			]),
		).toBe(2);
		expect(
			numberOfRightTriangles([
				[1, 0, 0, 0],
				[0, 1, 0, 1],
				[1, 0, 0, 0],
			]),
		).toBe(0);
		expect(
			numberOfRightTriangles([
				[1, 0, 1],
				[1, 0, 0],
				[1, 0, 0],
			]),
		).toBe(2);
	});
});
