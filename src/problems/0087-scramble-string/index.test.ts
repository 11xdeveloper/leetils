import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { scrambleString } from ".";

/** Scrambles a string by the problem's rules, with random splits and swaps. */
const scramble = (s: string, random: Random): string => {
	if (s.length <= 1) return s;
	const i = random.int(1, s.length - 1);
	const left = scramble(s.slice(0, i), random);
	const right = scramble(s.slice(i), random);
	return random.int(0, 1) === 0 ? left + right : right + left;
};

/** Every scramble of a string. */
const allScrambles = (s: string): Set<string> => {
	if (s.length <= 1) return new Set([s]);
	const results = new Set<string>();
	for (let i = 1; i < s.length; i++) {
		for (const left of allScrambles(s.slice(0, i))) {
			for (const right of allScrambles(s.slice(i))) {
				results.add(left + right);
				results.add(right + left);
			}
		}
	}
	return results;
};

describe("87. Scramble String", () => {
	it("solves the examples from the problem statement", () => {
		expect(scrambleString("great", "rgeat")).toBeTrue();
		expect(scrambleString("abcde", "caebd")).toBeFalse();
		expect(scrambleString("a", "a")).toBeTrue();
	});

	it("rejects strings with different letters", () => {
		expect(scrambleString("ab", "ac")).toBeFalse();
	});

	it("accepts random scrambles up to the constraint of 30 characters", () => {
		const random = createRandom(87);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 30), "abcdefghij");
			expect(scrambleString(s, scramble(s, random))).toBeTrue();
		}
	});

	it("matches listing every scramble of every permutation of a short string", () => {
		const s = "abcde";
		const scrambles = allScrambles(s);
		const permutations = (rest: string): string[] =>
			rest.length <= 1
				? [rest]
				: [...rest].flatMap((char, i) =>
						permutations(rest.slice(0, i) + rest.slice(i + 1)).map(
							(p) => char + p,
						),
					);
		for (const candidate of permutations(s)) {
			expect(scrambleString(s, candidate)).toBe(scrambles.has(candidate));
		}
	});
});
