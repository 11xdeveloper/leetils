import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findLongestAwesomeSubstring as longestAwesome } from ".";

/** Checks every substring's digit counts. */
const byBruteForce = (s: string): number => {
	let longest = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const sub = s.slice(i, j);
			const odd = [...new Set(sub)].filter(
				(d) => (sub.split(d).length - 1) % 2 === 1,
			).length;
			if (odd <= 1) longest = Math.max(longest, j - i);
		}
	}
	return longest;
};

describe("1542. Find Longest Awesome Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestAwesome("3242415")).toBe(5);
		expect(longestAwesome("12345678")).toBe(1);
		expect(longestAwesome("213123")).toBe(6);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(1542);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 14), "0123");
			expect(longestAwesome(s)).toBe(byBruteForce(s));
		}
	});
});
