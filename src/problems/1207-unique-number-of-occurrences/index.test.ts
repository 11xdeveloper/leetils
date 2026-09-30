import { describe, expect, it } from "bun:test";
import { uniqueNumberOfOccurrences as uniqueOccurrences } from ".";

describe("1207. Unique Number of Occurrences", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniqueOccurrences([1, 2, 2, 1, 1, 3])).toBeTrue();
		expect(uniqueOccurrences([1, 2])).toBeFalse();
		expect(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0])).toBeTrue();
	});

	it("handles a single value", () => {
		expect(uniqueOccurrences([7, 7, 7])).toBeTrue();
	});
});
