import { describe, expect, it } from "bun:test";
import { coloringABorder as colorBorder } from ".";

describe("1034. Coloring A Border", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			colorBorder(
				[
					[1, 1],
					[1, 2],
				],
				0,
				0,
				3,
			),
		).toEqual([
			[3, 3],
			[3, 2],
		]);
		expect(
			colorBorder(
				[
					[1, 2, 2],
					[2, 3, 2],
				],
				0,
				1,
				3,
			),
		).toEqual([
			[1, 3, 3],
			[2, 3, 3],
		]);
		expect(
			colorBorder(
				[
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
				],
				1,
				1,
				2,
			),
		).toEqual([
			[2, 2, 2],
			[2, 1, 2],
			[2, 2, 2],
		]);
	});

	it("leaves the input unchanged", () => {
		const grid = [
			[1, 1],
			[1, 2],
		];
		colorBorder(grid, 0, 0, 3);
		expect(grid).toEqual([
			[1, 1],
			[1, 2],
		]);
	});
});
