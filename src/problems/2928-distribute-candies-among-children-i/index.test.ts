import { describe, expect, it } from "bun:test";
import { distributeCandiesAmongChildrenI as distributeCandies } from ".";

describe("2928. Distribute Candies Among Children I", () => {
	it("solves the examples from the problem statement", () => {
		expect(distributeCandies(5, 2)).toBe(3);
		expect(distributeCandies(3, 3)).toBe(10);
	});
});
