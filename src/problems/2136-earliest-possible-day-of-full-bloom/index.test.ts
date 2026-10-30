import { describe, expect, it } from "bun:test";
import { earliestPossibleDayOfFullBloom as earliestFullBloom } from ".";

describe("2136. Earliest Possible Day of Full Bloom", () => {
	it("solves the examples from the problem statement", () => {
		expect(earliestFullBloom([1, 4, 3], [2, 3, 1])).toBe(9);
		expect(earliestFullBloom([1, 2, 3, 2], [2, 1, 2, 1])).toBe(9);
		expect(earliestFullBloom([1], [1])).toBe(2);
	});
});
