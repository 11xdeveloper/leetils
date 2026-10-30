import { describe, expect, it } from "bun:test";
import { countNumberOfBadPairs as countBadPairs } from ".";

describe("2364. Count Number of Bad Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBadPairs([4, 1, 3, 3])).toBe(5);
		expect(countBadPairs([1, 2, 3, 4, 5])).toBe(0);
	});
});
