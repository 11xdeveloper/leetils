import { describe, expect, it } from "bun:test";
import { countSortedVowelStrings as countVowelStrings } from ".";

describe("1641. Count Sorted Vowel Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countVowelStrings(1)).toBe(5);
		expect(countVowelStrings(2)).toBe(15);
		expect(countVowelStrings(33)).toBe(66045);
	});

	it("matches a dynamic program over the last vowel", () => {
		let endingWith = [1, 1, 1, 1, 1];
		for (let n = 1; n <= 50; n++) {
			expect(countVowelStrings(n)).toBe(
				endingWith.reduce((sum, count) => sum + count, 0),
			);
			endingWith = endingWith.map((_, v) =>
				endingWith.slice(0, v + 1).reduce((sum, count) => sum + count, 0),
			);
		}
	});
});
