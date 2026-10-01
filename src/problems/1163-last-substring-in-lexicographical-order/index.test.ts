import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lastSubstringInLexicographicalOrder as lastSubstring } from ".";

/** The largest of every substring. */
const byBruteForce = (s: string): string => {
	let best = "";
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const sub = s.slice(i, j);
			if (sub > best) best = sub;
		}
	}
	return best;
};

describe("1163. Last Substring in Lexicographical Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(lastSubstring("abab")).toBe("bab");
		expect(lastSubstring("leetcode")).toBe("tcode");
	});

	it("runs in linear time on repetitive strings", () => {
		const s = "z".repeat(200000) + "y" + "z".repeat(199999);
		expect(lastSubstring(s)).toBe(s);
		expect(lastSubstring("a".repeat(400000))).toBe("a".repeat(400000));
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(1163);
		for (let run = 0; run < 400; run++) {
			const s = random.string(
				random.int(1, 15),
				"abc".slice(0, random.int(1, 3)),
			);
			expect(lastSubstring(s)).toBe(byBruteForce(s));
		}
	});
});
