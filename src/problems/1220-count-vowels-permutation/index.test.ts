import { describe, expect, it } from "bun:test";
import { countVowelsPermutation as countVowelPermutation } from ".";

/** Builds every allowed string. */
const byBruteForce = (n: number): number => {
	const follows: Record<string, string> = {
		a: "e",
		e: "ai",
		i: "aeou",
		o: "iu",
		u: "a",
	};
	let strings = ["a", "e", "i", "o", "u"];
	for (let length = 1; length < n; length++) {
		strings = strings.flatMap((s) =>
			[...(follows[s.at(-1) ?? ""] ?? "")].map((next) => s + next),
		);
	}
	return strings.length;
};

describe("1220. Count Vowels Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(countVowelPermutation(1)).toBe(5);
		expect(countVowelPermutation(2)).toBe(10);
		expect(countVowelPermutation(5)).toBe(68);
	});

	it("stays within the modulus for the largest n", () => {
		const count = countVowelPermutation(20000);
		expect(count).toBeGreaterThanOrEqual(0);
		expect(count).toBeLessThan(1_000_000_007);
		expect(countVowelPermutation(144)).toBe(18208803);
	});

	it("matches building every string up to length 9", () => {
		for (let n = 1; n <= 9; n++)
			expect(countVowelPermutation(n)).toBe(byBruteForce(n));
	});
});
