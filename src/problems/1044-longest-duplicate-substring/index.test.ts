import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestDuplicateSubstring } from ".";

describe("1044. Longest Duplicate Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestDuplicateSubstring("banana")).toBe("ana");
		expect(longestDuplicateSubstring("abcd")).toBe("");
	});

	it("finds a repeated substring of the longest length on random strings", () => {
		const random = createRandom(1044);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(2, 20), "abc");
			let longest = 0;
			for (let length = 1; length < s.length; length++) {
				const seen = new Set<string>();
				for (let i = 0; i + length <= s.length; i++) {
					if (seen.has(s.slice(i, i + length))) longest = length;
					seen.add(s.slice(i, i + length));
				}
			}
			const result = longestDuplicateSubstring(s);
			expect(result).toHaveLength(longest);
			if (longest > 0)
				expect(s.indexOf(result)).not.toBe(s.lastIndexOf(result));
		}
	});

	it("handles a long string quickly", () => {
		expect(longestDuplicateSubstring("a".repeat(30_000))).toHaveLength(29_999);
	});
});
