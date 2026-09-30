import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestDuplicateSubstring } from "../1044-longest-duplicate-substring";
import { longestRepeatingSubstring } from ".";

describe("1062. Longest Repeating Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestRepeatingSubstring("abcd")).toBe(0);
		expect(longestRepeatingSubstring("abbaba")).toBe(2);
		expect(longestRepeatingSubstring("aabcaabdaab")).toBe(3);
	});

	it("agrees with Longest Duplicate Substring on random strings", () => {
		const random = createRandom(1062);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 25), "abc");
			expect(longestRepeatingSubstring(s)).toBe(
				longestDuplicateSubstring(s).length,
			);
		}
	});
});
