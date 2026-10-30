import { describe, expect, it } from "bun:test";
import { stringsUpTo } from "../../testing/random";
import { lexicographicallySmallestBeautifulString as smallestBeautifulString } from ".";

const beautiful = (s: string): boolean =>
	[...s].every((c, i) => c !== s.charAt(i - 1) && c !== s.charAt(i - 2));

describe("2663. Lexicographically Smallest Beautiful String", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestBeautifulString("abcz", 26)).toBe("abda");
		expect(smallestBeautifulString("dc", 4)).toBe("");
	});

	it("matches scanning every string for small alphabets", () => {
		for (let k = 1; k <= 4; k++) {
			const alphabet = [..."abcd"].slice(0, k);
			const all = stringsUpTo(alphabet, 4).filter(beautiful).sort();
			for (const s of all) {
				const next = all.find((t) => t.length === s.length && t > s) ?? "";
				expect(smallestBeautifulString(s, k)).toBe(next);
			}
		}
	});
});
