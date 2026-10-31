import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumFlipsToMakeBinaryStringCoherent as minFlips } from ".";

/** Tries every string of the same length. */
const byBruteForce = (s: string): number => {
	const n = s.length;
	const hasSubsequence = (t: string, pattern: string) => {
		let k = 0;
		for (const c of t) if (c === pattern[k]) k++;
		return k === pattern.length;
	};
	let best = n;
	for (let mask = 0; mask < 1 << n; mask++) {
		const t = mask.toString(2).padStart(n, "0");
		if (hasSubsequence(t, "011") || hasSubsequence(t, "110")) continue;
		let flips = 0;
		for (let i = 0; i < n; i++) if (t[i] !== s[i]) flips++;
		best = Math.min(best, flips);
	}
	return best;
};

describe("3922. Minimum Flips to Make Binary String Coherent", () => {
	it("solves the examples from the problem statement", () => {
		expect(minFlips("1010")).toBe(1);
		expect(minFlips("0110")).toBe(1);
		expect(minFlips("1000")).toBe(0);
	});

	it("matches trying every string", () => {
		const random = createRandom(3922);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "01");
			expect(minFlips(s)).toBe(byBruteForce(s));
		}
	});
});
