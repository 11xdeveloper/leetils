import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeDuplicateLetters } from "../0316-remove-duplicate-letters";
import { smallestSubsequenceOfDistinctCharacters as smallestSubsequence } from ".";

describe("1081. Smallest Subsequence of Distinct Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestSubsequence("bcabc")).toBe("abc");
		expect(smallestSubsequence("cbacdcbc")).toBe("acdb");
	});

	it("agrees with Remove Duplicate Letters, the same problem", () => {
		const random = createRandom(1081);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "abcd");
			expect(smallestSubsequence(s)).toBe(removeDuplicateLetters(s));
		}
	});
});
