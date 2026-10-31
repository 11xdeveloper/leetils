import { describe, expect, it } from "bun:test";
import { countNumberOfTrapezoidsI as countTrapezoids } from ".";

describe("3623. Count Number of Trapezoids I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countTrapezoids([
				[1, 0],
				[2, 0],
				[3, 0],
				[2, 2],
				[3, 2],
			]),
		).toBe(3);
		expect(
			countTrapezoids([
				[0, 0],
				[1, 0],
				[0, 1],
				[2, 1],
			]),
		).toBe(1);
	});
});
