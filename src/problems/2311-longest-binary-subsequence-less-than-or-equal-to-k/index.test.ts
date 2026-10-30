import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestBinarySubsequenceLessThanOrEqualToK as longestSubsequence } from ".";

/** Tries every subsequence. */
const byBruteForce = (s: string, k: number): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << s.length; mask++) {
		let sub = "";
		for (let i = 0; i < s.length; i++) if (mask & (1 << i)) sub += s[i];
		if (sub.length > best && Number.parseInt(sub || "0", 2) <= k)
			best = sub.length;
	}
	return best;
};

describe("2311. Longest Binary Subsequence Less Than or Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubsequence("1001010", 5)).toBe(5);
		expect(longestSubsequence("00101001", 1)).toBe(6);
	});

	it("matches trying every subsequence on random strings", () => {
		const random = createRandom(2311);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "01");
			const k = random.int(1, 40);
			expect(longestSubsequence(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
