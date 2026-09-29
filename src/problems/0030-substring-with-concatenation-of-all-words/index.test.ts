import { describe, expect, it } from "bun:test";
import { substringWithConcatenationOfAllWords as findSubstring } from ".";

const byBruteForce = (s: string, words: string[]): number[] => {
	const wordLength = words[0]?.length ?? 0;
	const windowLength = wordLength * words.length;
	const expected = words.toSorted().join(",");
	const starts: number[] = [];
	for (let start = 0; start + windowLength <= s.length; start++) {
		const chunks = Array.from({ length: words.length }, (_, i) =>
			s.slice(start + i * wordLength, start + (i + 1) * wordLength),
		);
		if (chunks.toSorted().join(",") === expected) starts.push(start);
	}
	return starts;
};

describe("30. Substring with Concatenation of All Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSubstring("barfoothefoobarman", ["foo", "bar"])).toEqual([0, 9]);
		expect(
			findSubstring("wordgoodgoodgoodbestword", [
				"word",
				"good",
				"best",
				"word",
			]),
		).toEqual([]);
		expect(
			findSubstring("barfoofoobarthefoobarman", ["bar", "foo", "the"]),
		).toEqual([6, 9, 12]);
	});

	it("respects how many times each word is repeated", () => {
		expect(
			findSubstring("wordgoodgoodgoodbestword", [
				"word",
				"good",
				"best",
				"good",
			]),
		).toEqual([8]);
		expect(findSubstring("aaaaaa", ["aa", "aa"])).toEqual([0, 1, 2]);
	});

	it("finds overlapping matches", () => {
		expect(findSubstring("abbaab", ["ab", "ba"])).toEqual([0, 2]);
	});

	it("returns nothing when s is shorter than the words combined", () => {
		expect(findSubstring("foo", ["foo", "bar"])).toEqual([]);
	});

	it("matches checking every start on random inputs", () => {
		let seed = 30;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		const randomString = (length: number) =>
			Array.from({ length }, () => "ab"[next() % 2]).join("");
		for (let run = 0; run < 500; run++) {
			const wordLength = 1 + (next() % 3);
			const words = Array.from({ length: 1 + (next() % 4) }, () =>
				randomString(wordLength),
			);
			const s = randomString(next() % 16);
			expect(findSubstring(s, words)).toEqual(byBruteForce(s, words));
		}
	});
});
