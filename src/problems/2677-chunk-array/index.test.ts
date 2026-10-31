import { describe, expect, it } from "bun:test";
import { chunkArray } from ".";

describe("2677. Chunk Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(chunkArray([1, 2, 3, 4, 5], 1)).toEqual([[1], [2], [3], [4], [5]]);
		expect(chunkArray([1, 9, 6, 3, 2], 3)).toEqual([
			[1, 9, 6],
			[3, 2],
		]);
		expect(chunkArray([8, 5, 3, 2, 6], 6)).toEqual([[8, 5, 3, 2, 6]]);
		expect(chunkArray([], 1)).toEqual([]);
	});
});
