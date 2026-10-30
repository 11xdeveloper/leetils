import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findLongestSpecialSubstringThatOccursThriceI } from "../2981-find-longest-special-substring-that-occurs-thrice-i";
import { findLongestSpecialSubstringThatOccursThriceII as maximumLength } from ".";

describe("2982. Find Longest Special Substring That Occurs Thrice II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumLength("aaaa")).toBe(2);
		expect(maximumLength("abcdef")).toBe(-1);
		expect(maximumLength("abcaba")).toBe(1);
	});

	it("matches counting every length on random strings", () => {
		const random = createRandom(2982);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(3, 20), "ab");
			expect(maximumLength(s)).toBe(
				findLongestSpecialSubstringThatOccursThriceI(s),
			);
		}
	});
});
