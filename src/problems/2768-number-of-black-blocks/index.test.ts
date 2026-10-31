import { describe, expect, it } from "bun:test";
import { numberOfBlackBlocks as countBlackBlocks } from ".";

describe("2768. Number of Black Blocks", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBlackBlocks(3, 3, [[0, 0]])).toEqual([3, 1, 0, 0, 0]);
		expect(
			countBlackBlocks(3, 3, [
				[0, 0],
				[1, 1],
				[0, 2],
			]),
		).toEqual([0, 2, 2, 0, 0]);
	});
});
