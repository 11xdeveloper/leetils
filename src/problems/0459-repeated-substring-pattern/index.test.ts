import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { repeatedSubstringPattern } from ".";

const byBruteForce = (s: string): boolean => {
	for (let length = 1; length < s.length; length++) {
		if (
			s.length % length === 0 &&
			s.slice(0, length).repeat(s.length / length) === s
		)
			return true;
	}
	return false;
};

describe("459. Repeated Substring Pattern", () => {
	it("solves the examples from the problem statement", () => {
		expect(repeatedSubstringPattern("abab")).toBeTrue();
		expect(repeatedSubstringPattern("aba")).toBeFalse();
		expect(repeatedSubstringPattern("abcabcabcabc")).toBeTrue();
		expect(repeatedSubstringPattern("a")).toBeFalse();
	});

	it("matches trying every length on random inputs", () => {
		const random = createRandom(459);
		for (let run = 0; run < 1000; run++) {
			const s =
				random.string(random.int(1, 4), "ab").repeat(random.int(1, 4)) +
				random.string(random.int(0, 1), "ab");
			expect(repeatedSubstringPattern(s)).toBe(byBruteForce(s));
		}
	});
});
