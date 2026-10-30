import { describe, expect, it } from "bun:test";
import { maximumSquareAreaByRemovingFencesFromAField as maximizeSquareArea } from ".";

describe("2975. Maximum Square Area by Removing Fences From a Field", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeSquareArea(4, 3, [2, 3], [2])).toBe(4);
		expect(maximizeSquareArea(6, 7, [2], [4])).toBe(-1);
	});

	it("reduces large areas modulo 1e9 + 7", () => {
		const side = 999_999_999n;
		expect(maximizeSquareArea(1_000_000_000, 1_000_000_000, [], [])).toBe(
			Number((side * side) % 1_000_000_007n),
		);
	});
});
