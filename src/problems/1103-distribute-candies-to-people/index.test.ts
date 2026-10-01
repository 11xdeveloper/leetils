import { describe, expect, it } from "bun:test";
import { distributeCandiesToPeople as distributeCandies } from ".";

describe("1103. Distribute Candies to People", () => {
	it("solves the examples from the problem statement", () => {
		expect(distributeCandies(7, 4)).toEqual([1, 2, 3, 1]);
		expect(distributeCandies(10, 3)).toEqual([5, 2, 3]);
	});

	it("gives out every candy, up to the largest inputs", () => {
		for (const [candies, people] of [
			[1, 1],
			[1, 1000],
			[10 ** 9, 1],
			[10 ** 9, 1000],
			[123456789, 37],
		] as const) {
			const result = distributeCandies(candies, people);
			expect(result).toHaveLength(people);
			expect(result.reduce((sum, count) => sum + count, 0)).toBe(candies);
		}
	});

	it("goes round the row more than once", () => {
		// Gifts 1..6 go to people 0, 1, 0, 1, 0, 1, then 21 - 21 = 0 are left.
		expect(distributeCandies(21, 2)).toEqual([9, 12]);
		expect(distributeCandies(20, 2)).toEqual([9, 11]);
	});
});
