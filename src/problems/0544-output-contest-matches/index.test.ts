import { describe, expect, it } from "bun:test";
import { outputContestMatches as findContestMatch } from ".";

describe("544. Output Contest Matches", () => {
	it("solves the examples from the problem statement", () => {
		expect(findContestMatch(4)).toBe("((1,4),(2,3))");
		expect(findContestMatch(8)).toBe("(((1,8),(4,5)),((2,7),(3,6)))");
	});

	it("handles the smallest and largest inputs", () => {
		expect(findContestMatch(2)).toBe("(1,2)");
		const bracket = findContestMatch(4096);
		expect(
			bracket
				.match(/\d+/g)
				?.map(Number)
				.sort((a, b) => a - b),
		).toEqual(Array.from({ length: 4096 }, (_, i) => i + 1));
		expect(bracket.startsWith(`${"(".repeat(12)}1,4096)`)).toBeTrue();
	});
});
