import { describe, expect, it } from "bun:test";
import { projectionAreaOf3dShapes as projectionArea } from ".";

describe("883. Projection Area of 3D Shapes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			projectionArea([
				[1, 2],
				[3, 4],
			]),
		).toBe(17);
		expect(projectionArea([[2]])).toBe(5);
		expect(
			projectionArea([
				[1, 0],
				[0, 2],
			]),
		).toBe(8);
	});
});
