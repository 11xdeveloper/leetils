import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromePairs } from ".";

const byBruteForce = (words: string[]): string[] => {
	const pairs: string[] = [];
	for (const [i, a] of words.entries()) {
		for (const [j, b] of words.entries()) {
			const joined = a + b;
			if (i !== j && joined === [...joined].reverse().join(""))
				pairs.push(`${i},${j}`);
		}
	}
	return pairs.toSorted();
};

const normalize = (pairs: number[][]): string[] =>
	pairs.map((pair) => pair.join(",")).toSorted();

describe("336. Palindrome Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			normalize(palindromePairs(["abcd", "dcba", "lls", "s", "sssll"])),
		).toEqual(
			normalize([
				[0, 1],
				[1, 0],
				[3, 2],
				[2, 4],
			]),
		);
		expect(normalize(palindromePairs(["bat", "tab", "cat"]))).toEqual(
			normalize([
				[0, 1],
				[1, 0],
			]),
		);
		expect(normalize(palindromePairs(["a", ""]))).toEqual(
			normalize([
				[0, 1],
				[1, 0],
			]),
		);
	});

	it("matches checking every pair on random distinct words", () => {
		const random = createRandom(336);
		for (let run = 0; run < 500; run++) {
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 8) }, () =>
						random.string(random.int(0, 4), "ab"),
					),
				),
			];
			const pairs = palindromePairs(words);
			expect(new Set(normalize(pairs)).size).toBe(pairs.length);
			expect(normalize(pairs)).toEqual(byBruteForce(words));
		}
	});
});
