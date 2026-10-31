import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestCommonPrefixAfterAtMostOneRemoval as longestCommonPrefix } from ".";

describe("3460. Longest Common Prefix After at Most One Removal", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestCommonPrefix("madxa", "madam")).toBe(4);
		expect(longestCommonPrefix("leetcode", "eetcode")).toBe(7);
		expect(longestCommonPrefix("one", "one")).toBe(3);
		expect(longestCommonPrefix("a", "b")).toBe(0);
	});

	it("matches trying every removal on random strings", () => {
		const random = createRandom(3460);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 8), "ab");
			const t = random.string(random.int(1, 8), "ab");
			const lcp = (a: string) => {
				let k = 0;
				while (k < a.length && k < t.length && a[k] === t[k]) k++;
				return k;
			};
			let best = lcp(s);
			for (let i = 0; i < s.length; i++)
				best = Math.max(best, lcp(s.slice(0, i) + s.slice(i + 1)));
			expect(longestCommonPrefix(s, t)).toBe(best);
		}
	});
});
