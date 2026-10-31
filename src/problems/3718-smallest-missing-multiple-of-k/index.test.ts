import { describe, expect, it } from "bun:test";
import { smallestMissingMultipleOfK as missingMultiple } from ".";

describe("3718. Smallest Missing Multiple of K", () => {
	it("solves the examples from the problem statement", () => {
		expect(missingMultiple([8, 2, 3, 4, 6], 2)).toBe(10);
		expect(missingMultiple([1, 4, 7, 10, 15], 5)).toBe(5);
	});
});
