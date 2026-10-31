import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestKLengthSubsequenceWithOccurrencesOfALetter as smallestSubsequence } from ".";

/** Tries every subsequence of length k. */
const byBruteForce = (
	s: string,
	k: number,
	letter: string,
	repetition: number,
): string => {
	let best: string | undefined;
	for (let mask = 0; mask < 1 << s.length; mask++) {
		let sub = "";
		for (let i = 0; i < s.length; i++) if (mask & (1 << i)) sub += s[i];
		if (sub.length !== k) continue;
		if ([...sub].filter((char) => char === letter).length < repetition)
			continue;
		if (best === undefined || sub < best) best = sub;
	}
	return best ?? "";
};

describe("2030. Smallest K-Length Subsequence With Occurrences of a Letter", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestSubsequence("leet", 3, "e", 1)).toBe("eet");
		expect(smallestSubsequence("leetcode", 4, "e", 2)).toBe("ecde");
		expect(smallestSubsequence("bb", 2, "b", 2)).toBe("bb");
	});

	it("matches trying every subsequence on random strings", () => {
		const random = createRandom(2030);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "abcd");
			const letter = s[random.int(0, s.length - 1)] ?? "a";
			const occurrences = [...s].filter((char) => char === letter).length;
			const repetition = random.int(1, occurrences);
			const k = random.int(repetition, s.length);
			expect(smallestSubsequence(s, k, letter, repetition)).toBe(
				byBruteForce(s, k, letter, repetition),
			);
		}
	});
});
