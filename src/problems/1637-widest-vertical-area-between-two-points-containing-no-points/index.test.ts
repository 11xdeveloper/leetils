import { describe, expect, it } from "bun:test";
import { widestVerticalAreaBetweenTwoPointsContainingNoPoints as maxWidthOfVerticalArea } from ".";

describe("1637. Widest Vertical Area Between Two Points Containing No Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxWidthOfVerticalArea([
				[8, 7],
				[9, 9],
				[7, 4],
				[9, 7],
			]),
		).toBe(1);
		expect(
			maxWidthOfVerticalArea([
				[3, 1],
				[9, 0],
				[1, 0],
				[1, 4],
				[5, 3],
				[8, 8],
			]),
		).toBe(3);
	});
});
