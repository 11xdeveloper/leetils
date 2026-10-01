import { describe, expect, it } from "bun:test";
import { flippingAnImage as flipAndInvertImage } from ".";

describe("832. Flipping an Image", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			flipAndInvertImage([
				[1, 1, 0],
				[1, 0, 1],
				[0, 0, 0],
			]),
		).toEqual([
			[1, 0, 0],
			[0, 1, 0],
			[1, 1, 1],
		]);
		expect(
			flipAndInvertImage([
				[1, 1, 0, 0],
				[1, 0, 0, 1],
				[0, 1, 1, 1],
				[1, 0, 1, 0],
			]),
		).toEqual([
			[1, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 1],
			[1, 0, 1, 0],
		]);
	});
});
