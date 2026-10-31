import { describe, expect, it } from "bun:test";
import { distributeCandiesAmongChildrenIII as distributeCandies } from ".";

describe("2927. Distribute Candies Among Children III", () => {
	it("solves the examples from the problem statement", () => {
		expect(distributeCandies(5, 2)).toBe(3);
		expect(distributeCandies(3, 3)).toBe(10);
	});

	it("matches counting directly for small values", () => {
		for (let n = 0; n <= 20; n++)
			for (let limit = 1; limit <= 10; limit++) {
				let ways = 0;
				for (let a = 0; a <= limit; a++)
					for (let b = 0; b <= limit; b++)
						if (n - a - b >= 0 && n - a - b <= limit) ways++;
				expect(distributeCandies(n, limit)).toBe(ways);
			}
	});

	it("handles huge values", () => {
		expect(distributeCandies(100_000_000, 100_000_000)).toBe(
			5_000_000_150_000_001,
		);
	});
});
