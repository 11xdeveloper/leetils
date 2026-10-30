import { describe, expect, it } from "bun:test";
import { minimumReplacementsToSortTheArray as minimumReplacement } from ".";

describe("2366. Minimum Replacements to Sort the Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumReplacement([3, 9, 3])).toBe(2);
		expect(minimumReplacement([1, 2, 3, 4, 5])).toBe(0);
	});

	it("splits evenly to keep later caps high", () => {
		expect(minimumReplacement([12, 9, 7, 6, 17, 19, 21])).toBe(6);
	});
});
