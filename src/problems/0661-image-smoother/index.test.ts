import { describe, expect, it } from "bun:test";
import { imageSmoother } from ".";

describe("661. Image Smoother", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			imageSmoother([
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			]),
		).toEqual([
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		]);
		expect(
			imageSmoother([
				[100, 200, 100],
				[200, 50, 200],
				[100, 200, 100],
			]),
		).toEqual([
			[137, 141, 137],
			[141, 138, 141],
			[137, 141, 137],
		]);
	});

	it("handles single rows, columns and cells", () => {
		expect(imageSmoother([[1, 2, 3]])).toEqual([[1, 2, 2]]);
		expect(imageSmoother([[1], [2], [3]])).toEqual([[1], [2], [2]]);
		expect(imageSmoother([[7]])).toEqual([[7]]);
	});
});
