import { describe, expect, it } from "bun:test";
import { maximumAreaOfAPieceOfCakeAfterHorizontalAndVerticalCuts as maxArea } from ".";

describe("1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxArea(5, 4, [1, 2, 4], [1, 3])).toBe(4);
		expect(maxArea(5, 4, [3, 1], [1])).toBe(6);
		expect(maxArea(5, 4, [3], [3])).toBe(9);
	});

	it("reduces huge areas modulo 10^9 + 7", () => {
		expect(maxArea(10 ** 9, 10 ** 9, [1], [1])).toBe(
			Number((10n ** 9n - 1n) ** 2n % 1_000_000_007n),
		);
	});
});
