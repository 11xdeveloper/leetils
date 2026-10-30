import { describe, expect, it } from "bun:test";
import { sellingPiecesOfWood as sellingWood } from ".";

describe("2312. Selling Pieces of Wood", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sellingWood(3, 5, [
				[1, 4, 2],
				[2, 2, 7],
				[2, 1, 3],
			]),
		).toBe(19);
		expect(
			sellingWood(4, 6, [
				[3, 2, 10],
				[1, 4, 2],
				[4, 1, 3],
			]),
		).toBe(32);
	});
});
