import { describe, expect, it } from "bun:test";
import { positionsOfLargeGroups as largeGroupPositions } from ".";

describe("830. Positions of Large Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(largeGroupPositions("abbxxxxzzy")).toEqual([[3, 6]]);
		expect(largeGroupPositions("abc")).toEqual([]);
		expect(largeGroupPositions("abcdddeeeeaabbbcd")).toEqual([
			[3, 5],
			[6, 9],
			[12, 14],
		]);
	});

	it("includes a group at the very end", () => {
		expect(largeGroupPositions("aaa")).toEqual([[0, 2]]);
	});
});
