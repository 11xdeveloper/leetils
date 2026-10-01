import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfVowelsInASubstringOfGivenLength as maxVowels } from ".";

describe("1456. Maximum Number of Vowels in a Substring of Given Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxVowels("abciiidef", 3)).toBe(3);
		expect(maxVowels("aeiou", 2)).toBe(2);
		expect(maxVowels("leetcode", 3)).toBe(2);
	});

	it("matches counting every window on random inputs", () => {
		const random = createRandom(1456);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "aebc");
			const k = random.int(1, s.length);
			let expected = 0;
			for (let i = 0; i + k <= s.length; i++) {
				expected = Math.max(
					expected,
					[...s.slice(i, i + k)].filter((c) => "aeiou".includes(c)).length,
				);
			}
			expect(maxVowels(s, k)).toBe(expected);
		}
	});
});
