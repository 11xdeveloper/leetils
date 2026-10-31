import { describe, expect, it } from "bun:test";
import { reverseWordsWithSameVowelCount as reverseWords } from ".";

describe("3775. Reverse Words With Same Vowel Count", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseWords("cat and mice")).toBe("cat dna mice");
		expect(reverseWords("book is nice")).toBe("book is ecin");
		expect(reverseWords("banana healthy")).toBe("banana healthy");
	});
});
