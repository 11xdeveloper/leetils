import { describe, expect, it } from "bun:test";
import { maximizeAreaOfSquareHoleInGrid as maximizeSquareHoleArea } from ".";

describe("2943. Maximize Area of Square Hole in Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeSquareHoleArea(2, 1, [2, 3], [2])).toBe(4);
		expect(maximizeSquareHoleArea(1, 1, [2], [2])).toBe(4);
		expect(maximizeSquareHoleArea(2, 3, [2, 3], [2, 4])).toBe(4);
	});
});
