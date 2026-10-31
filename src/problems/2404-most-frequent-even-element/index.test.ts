import { describe, expect, it } from "bun:test";
import { mostFrequentEvenElement as mostFrequentEven } from ".";

describe("2404. Most Frequent Even Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(mostFrequentEven([0, 1, 2, 2, 4, 4, 1])).toBe(2);
		expect(mostFrequentEven([4, 4, 4, 9, 2, 4])).toBe(4);
		expect(mostFrequentEven([29, 47, 21, 41, 13, 37, 25, 7])).toBe(-1);
	});
});
