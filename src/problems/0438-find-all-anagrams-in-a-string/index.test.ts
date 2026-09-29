import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAllAnagramsInAString as findAnagrams } from ".";

const sortedLetters = (text: string): string => [...text].sort().join("");

describe("438. Find All Anagrams in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(findAnagrams("cbaebabacd", "abc")).toEqual([0, 6]);
		expect(findAnagrams("abab", "ab")).toEqual([0, 1, 2]);
	});

	it("returns nothing when p is longer than s", () => {
		expect(findAnagrams("a", "ab")).toEqual([]);
	});

	it("matches sorting every window on random inputs", () => {
		const random = createRandom(438);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "abc");
			const p = random.string(random.int(1, 4), "abc");
			const expected = Array.from(
				{ length: Math.max(0, s.length - p.length + 1) },
				(_, i) => i,
			).filter(
				(i) => sortedLetters(s.slice(i, i + p.length)) === sortedLetters(p),
			);
			expect(findAnagrams(s, p)).toEqual(expected);
		}
	});
});
