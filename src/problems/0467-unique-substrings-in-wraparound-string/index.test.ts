import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { uniqueSubstringsInWraparoundString as findSubstringInWraproundString } from ".";

const base = "abcdefghijklmnopqrstuvwxyz".repeat(3);

const byBruteForce = (s: string): number => {
	const found = new Set<string>();
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length && j - i <= 26; j++) {
			if (base.includes(s.slice(i, j))) found.add(s.slice(i, j));
		}
	}
	return found.size;
};

describe("467. Unique Substrings in Wraparound String", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSubstringInWraproundString("a")).toBe(1);
		expect(findSubstringInWraproundString("cac")).toBe(2);
		expect(findSubstringInWraproundString("zab")).toBe(6);
	});

	it("counts long runs through the whole alphabet", () => {
		// The last 26 letters end runs of 53 to 78 letters: 53 + 54 + … + 78.
		expect(findSubstringInWraproundString(base)).toBe(1703);
	});

	it("matches collecting every matching substring on random inputs", () => {
		const random = createRandom(467);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 20), "xyzabc");
			expect(findSubstringInWraproundString(s)).toBe(byBruteForce(s));
		}
	});
});
