import { describe, expect, it } from "bun:test";
import { numberOfBeautifulPairs as countBeautifulPairs } from ".";

describe("2748. Number of Beautiful Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBeautifulPairs([2, 5, 1, 4])).toBe(5);
		expect(countBeautifulPairs([11, 21, 12])).toBe(2);
	});
});
