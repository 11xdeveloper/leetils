import { describe, expect, it } from "bun:test";
import { distributeCandiesAmongChildrenI } from "../2928-distribute-candies-among-children-i";
import { distributeCandiesAmongChildrenII as distributeCandies } from ".";

describe("2929. Distribute Candies Among Children II", () => {
	it("solves the examples from the problem statement", () => {
		expect(distributeCandies(5, 2)).toBe(3);
		expect(distributeCandies(3, 3)).toBe(10);
	});

	it("matches trying every pair of shares", () => {
		for (let n = 1; n <= 30; n++)
			for (let limit = 1; limit <= 15; limit++)
				expect(distributeCandies(n, limit)).toBe(
					distributeCandiesAmongChildrenI(n, limit),
				);
	});
});
