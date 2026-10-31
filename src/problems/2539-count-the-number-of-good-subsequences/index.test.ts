import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfGoodSubsequences as countGoodSubsequences } from ".";

/** Checks every subsequence. */
const byBruteForce = (s: string): number => {
	let good = 0;
	for (let mask = 1; mask < 1 << s.length; mask++) {
		const counts = new Map<string, number>();
		for (let i = 0; i < s.length; i++)
			if ((mask >> i) & 1)
				counts.set(s.charAt(i), (counts.get(s.charAt(i)) ?? 0) + 1);
		if (new Set(counts.values()).size === 1) good++;
	}
	return good;
};

describe("2539. Count the Number of Good Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodSubsequences("aabb")).toBe(11);
		expect(countGoodSubsequences("leet")).toBe(12);
		expect(countGoodSubsequences("abcd")).toBe(15);
	});

	it("matches checking every subsequence on random strings", () => {
		const random = createRandom(2539);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 10), "abc");
			expect(countGoodSubsequences(s)).toBe(byBruteForce(s));
		}
	});
});
