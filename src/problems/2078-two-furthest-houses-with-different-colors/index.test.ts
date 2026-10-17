import { describe, expect, it } from "bun:test";
import { twoFurthestHousesWithDifferentColors as maxDistance } from ".";

describe("2078. Two Furthest Houses With Different Colors", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistance([1, 1, 1, 6, 1, 1, 1])).toBe(3);
		expect(maxDistance([1, 8, 3, 8, 3])).toBe(4);
		expect(maxDistance([0, 1])).toBe(1);
	});

	it("uses the far end when the near one matches", () => {
		expect(maxDistance([1, 2, 1, 1])).toBe(2);
	});
});
