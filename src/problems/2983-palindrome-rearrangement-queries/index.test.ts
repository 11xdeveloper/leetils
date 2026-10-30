import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromeRearrangementQueries as canMakePalindromeQueries } from ".";

const permutations = (letters: string[]): string[] => {
	if (letters.length <= 1) return [letters.join("")];
	const result = new Set<string>();
	for (const [i, c] of letters.entries())
		for (const rest of permutations([
			...letters.slice(0, i),
			...letters.slice(i + 1),
		]))
			result.add(c + rest);
	return [...result];
};

/** Tries every rearrangement of both ranges. */
const byBruteForce = (s: string, queries: number[][]): boolean[] =>
	queries.map(([a = 0, b = 0, c = 0, d = 0]) => {
		for (const left of permutations([...s.slice(a, b + 1)]))
			for (const right of permutations([...s.slice(c, d + 1)])) {
				const t =
					s.slice(0, a) + left + s.slice(b + 1, c) + right + s.slice(d + 1);
				if (t === [...t].reverse().join("")) return true;
			}
		return false;
	});

describe("2983. Palindrome Rearrangement Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canMakePalindromeQueries("abcabc", [
				[1, 1, 3, 5],
				[0, 2, 5, 5],
			]),
		).toEqual([true, true]);
		expect(canMakePalindromeQueries("abbcdecbba", [[0, 2, 7, 9]])).toEqual([
			false,
		]);
		expect(canMakePalindromeQueries("acbcab", [[1, 2, 4, 5]])).toEqual([true]);
	});

	it("matches trying every rearrangement on random strings", () => {
		const random = createRandom(2983);
		for (let run = 0; run < 300; run++) {
			const half = random.int(1, 4);
			const s = random.string(2 * half, "ab");
			const queries = Array.from({ length: 4 }, () => {
				const a = random.int(0, half - 1);
				const b = random.int(a, half - 1);
				const c = random.int(half, 2 * half - 1);
				const d = random.int(c, 2 * half - 1);
				return [a, b, c, d];
			});
			expect(canMakePalindromeQueries(s, queries)).toEqual(
				byBruteForce(s, queries),
			);
		}
	});
});
