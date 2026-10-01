import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distinctSubsequences } from ".";

/** Counts subsequences by trying every subset of positions. */
const byBruteForce = (s: string, t: string): number => {
	let count = 0;
	for (let mask = 0; mask < 1 << s.length; mask++) {
		let picked = "";
		for (let i = 0; i < s.length; i++) if (mask & (1 << i)) picked += s[i];
		if (picked === t) count++;
	}
	return count;
};

describe("115. Distinct Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctSubsequences("rabbbit", "rabbit")).toBe(3);
		expect(distinctSubsequences("babgbag", "bag")).toBe(5);
	});

	it("returns 0 when t is longer than s", () => {
		expect(distinctSubsequences("ab", "abc")).toBe(0);
	});

	it("matches trying every subset of positions on random inputs", () => {
		const random = createRandom(115);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "ab");
			const t = random.string(random.int(1, 4), "ab");
			expect(distinctSubsequences(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
