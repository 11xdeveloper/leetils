import { describe, expect, it } from "bun:test";
import { minimumRecolorsToGetKConsecutiveBlackBlocks as minimumRecolors } from ".";

describe("2379. Minimum Recolors to Get K Consecutive Black Blocks", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumRecolors("WBBWWBBWBW", 7)).toBe(3);
		expect(minimumRecolors("WBWBBBW", 2)).toBe(0);
	});
});
