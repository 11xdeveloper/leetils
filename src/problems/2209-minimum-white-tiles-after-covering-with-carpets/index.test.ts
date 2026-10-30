import { describe, expect, it } from "bun:test";
import { minimumWhiteTilesAfterCoveringWithCarpets as minimumWhiteTiles } from ".";

describe("2209. Minimum White Tiles After Covering With Carpets", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumWhiteTiles("10110101", 2, 2)).toBe(2);
		expect(minimumWhiteTiles("11111", 2, 3)).toBe(0);
	});

	it("leaves tiles uncovered when carpets run out", () => {
		expect(minimumWhiteTiles("1010101", 1, 2)).toBe(3);
	});
});
