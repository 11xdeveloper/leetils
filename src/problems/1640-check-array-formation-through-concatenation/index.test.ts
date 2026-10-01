import { describe, expect, it } from "bun:test";
import { checkArrayFormationThroughConcatenation as canFormArray } from ".";

describe("1640. Check Array Formation Through Concatenation", () => {
	it("solves the examples from the problem statement", () => {
		expect(canFormArray([15, 88], [[88], [15]])).toBeTrue();
		expect(canFormArray([49, 18, 16], [[16, 18, 49]])).toBeFalse();
		expect(canFormArray([91, 4, 64, 78], [[78], [4, 64], [91]])).toBeTrue();
	});

	it("rejects a piece that runs past the end", () => {
		expect(canFormArray([1, 2], [[1, 2, 3]])).toBeFalse();
	});
});
