import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestHappyPrefix as longestPrefix } from ".";

/** Tries every length, longest first. */
const byBruteForce = (s: string): string => {
	for (let length = s.length - 1; length > 0; length--) {
		if (s.slice(0, length) === s.slice(s.length - length))
			return s.slice(0, length);
	}
	return "";
};

describe("1392. Longest Happy Prefix", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPrefix("level")).toBe("l");
		expect(longestPrefix("ababab")).toBe("abab");
	});

	it("handles long repetitive strings", () => {
		expect(longestPrefix("a".repeat(100000))).toBe("a".repeat(99999));
		expect(longestPrefix(`${"a".repeat(50000)}b${"a".repeat(49999)}`)).toBe(
			"a".repeat(49999),
		);
	});

	it("matches trying every length on random inputs", () => {
		const random = createRandom(1392);
		for (let run = 0; run < 400; run++) {
			const s = random.string(random.int(1, 15), "ab");
			expect(longestPrefix(s)).toBe(byBruteForce(s));
		}
	});
});
