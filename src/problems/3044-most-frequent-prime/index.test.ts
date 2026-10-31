import { describe, expect, it } from "bun:test";
import { mostFrequentPrime } from ".";

describe("3044. Most Frequent Prime", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostFrequentPrime([
				[1, 1],
				[9, 9],
				[1, 1],
			]),
		).toBe(19);
		expect(mostFrequentPrime([[7]])).toBe(-1);
		expect(
			mostFrequentPrime([
				[9, 7, 8],
				[4, 6, 5],
				[2, 8, 6],
			]),
		).toBe(97);
	});
});
