import { describe, expect, it } from "bun:test";
import { describeThePainting as splitPainting } from ".";

describe("1943. Describe the Painting", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			splitPainting([
				[1, 4, 5],
				[4, 7, 7],
				[1, 7, 9],
			]),
		).toEqual([
			[1, 4, 14],
			[4, 7, 16],
		]);
		expect(
			splitPainting([
				[1, 7, 9],
				[6, 8, 15],
				[8, 10, 7],
			]),
		).toEqual([
			[1, 6, 9],
			[6, 7, 24],
			[7, 8, 15],
			[8, 10, 7],
		]);
		expect(
			splitPainting([
				[1, 4, 5],
				[1, 4, 7],
				[4, 7, 1],
				[4, 7, 11],
			]),
		).toEqual([
			[1, 4, 12],
			[4, 7, 12],
		]);
	});

	it("leaves out unpainted gaps", () => {
		expect(
			splitPainting([
				[1, 2, 3],
				[5, 6, 4],
			]),
		).toEqual([
			[1, 2, 3],
			[5, 6, 4],
		]);
	});
});
