import { describe, expect, it } from "bun:test";
import { gridGame } from ".";

describe("2017. Grid Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			gridGame([
				[2, 5, 4],
				[1, 5, 1],
			]),
		).toBe(4);
		expect(
			gridGame([
				[3, 3, 1],
				[8, 5, 2],
			]),
		).toBe(4);
		expect(
			gridGame([
				[1, 3, 1, 15],
				[1, 3, 3, 1],
			]),
		).toBe(7);
	});

	it("leaves nothing on a single column", () => {
		expect(gridGame([[5], [7]])).toBe(0);
	});
});
