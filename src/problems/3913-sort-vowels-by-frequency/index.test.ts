import { describe, expect, it } from "bun:test";
import { sortVowelsByFrequency as sortVowels } from ".";

describe("3913. Sort Vowels by Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortVowels("leetcode")).toBe("leetcedo");
		expect(sortVowels("aeiaaioooa")).toBe("aaaaoooiie");
		expect(sortVowels("baeiou")).toBe("baeiou");
	});
});
