import { describe, expect, it } from "bun:test";
import { multiSourceFloodFill as colorGrid } from ".";

describe("3905. Multi Source Flood Fill", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			colorGrid(3, 3, [
				[0, 0, 1],
				[2, 2, 2],
			]),
		).toEqual([
			[1, 1, 2],
			[1, 2, 2],
			[2, 2, 2],
		]);
		expect(
			colorGrid(3, 3, [
				[0, 1, 3],
				[1, 1, 5],
			]),
		).toEqual([
			[3, 3, 3],
			[5, 5, 5],
			[5, 5, 5],
		]);
		expect(colorGrid(2, 2, [[1, 1, 5]])).toEqual([
			[5, 5],
			[5, 5],
		]);
	});
});
