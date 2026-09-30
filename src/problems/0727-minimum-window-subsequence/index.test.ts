import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumWindowSubsequence as minWindow } from ".";

const byBruteForce = (s1: string, s2: string): string => {
	const contains = (window: string) => {
		let i = 0;
		for (const char of window) if (char === s2.charAt(i)) i++;
		return i === s2.length;
	};
	for (let length = s2.length; length <= s1.length; length++) {
		for (let start = 0; start + length <= s1.length; start++) {
			if (contains(s1.slice(start, start + length)))
				return s1.slice(start, start + length);
		}
	}
	return "";
};

describe("727. Minimum Window Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(minWindow("abcdebdde", "bde")).toBe("bcde");
		expect(minWindow("jmeqksfrsdcmsiwvaovztaqenprpvnbstl", "u")).toBe("");
	});

	it("matches checking every window on random inputs", () => {
		const random = createRandom(727);
		for (let run = 0; run < 1000; run++) {
			const s1 = random.string(random.int(1, 15), "abc");
			const s2 = random.string(random.int(1, 4), "abc");
			expect(minWindow(s1, s2)).toBe(byBruteForce(s1, s2));
		}
	});
});
