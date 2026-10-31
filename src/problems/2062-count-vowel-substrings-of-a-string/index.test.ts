import { describe, expect, it } from "bun:test";
import { countVowelSubstringsOfAString as countVowelSubstrings } from ".";

describe("2062. Count Vowel Substrings of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(countVowelSubstrings("aeiouu")).toBe(2);
		expect(countVowelSubstrings("unicornarihan")).toBe(0);
		expect(countVowelSubstrings("cuaieuouac")).toBe(7);
	});
});
