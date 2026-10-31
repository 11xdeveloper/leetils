import { describe, expect, it } from "bun:test";
import { theNumberOfWaysToMakeTheSum as numberOfWays } from ".";

describe("3183. The Number of Ways to Make the Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays(4)).toBe(4);
		expect(numberOfWays(12)).toBe(22);
		expect(numberOfWays(5)).toBe(4);
	});

	it("matches counting coin combinations", () => {
		for (let n = 1; n <= 30; n++) {
			let count = 0;
			for (let fours = 0; fours <= 2; fours++)
				for (let sixes = 0; 4 * fours + 6 * sixes <= n; sixes++)
					for (let twos = 0; 4 * fours + 6 * sixes + 2 * twos <= n; twos++)
						count++;
			expect(numberOfWays(n)).toBe(count);
		}
	});
});
