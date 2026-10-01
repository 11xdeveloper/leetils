import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countUniqueCharactersOfAllSubstringsOfAGivenString as uniqueLetterString } from ".";

const byBruteForce = (s: string): number => {
	let total = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const sub = [...s.slice(i, j)];
			total += sub.filter(
				(char) => sub.indexOf(char) === sub.lastIndexOf(char),
			).length;
		}
	}
	return total;
};

describe("828. Count Unique Characters of All Substrings of a Given String", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniqueLetterString("ABC")).toBe(10);
		expect(uniqueLetterString("ABA")).toBe(8);
		expect(uniqueLetterString("LEETCODE")).toBe(92);
	});

	it("matches counting every substring on random inputs", () => {
		const random = createRandom(828);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 15), "ABC");
			expect(uniqueLetterString(s)).toBe(byBruteForce(s));
		}
	});
});
