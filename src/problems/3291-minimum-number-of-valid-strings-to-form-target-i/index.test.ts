import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfValidStringsToFormTargetI as minValidStrings } from ".";

/** Dynamic programming over every valid prefix at every position. */
const byBruteForce = (words: string[], target: string): number => {
	const best = new Array<number>(target.length + 1).fill(
		Number.POSITIVE_INFINITY,
	);
	best[0] = 0;
	for (let i = 0; i < target.length; i++)
		for (const word of words)
			for (
				let length = 1;
				length <= word.length && target.startsWith(word.slice(0, length), i);
				length++
			)
				best[i + length] = Math.min(best[i + length] ?? 0, (best[i] ?? 0) + 1);
	const answer = best[target.length] ?? 0;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};

describe("3291. Minimum Number of Valid Strings to Form Target I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minValidStrings(["abc", "aaaaa", "bcdef"], "aabcdabc")).toBe(3);
		expect(minValidStrings(["abababab", "ab"], "ababaababa")).toBe(2);
		expect(minValidStrings(["abcdef"], "xyz")).toBe(-1);
	});

	it("matches a direct dynamic program on random inputs", () => {
		const random = createRandom(3291);
		for (let run = 0; run < 300; run++) {
			const words = Array.from({ length: random.int(1, 4) }, () =>
				random.string(random.int(1, 5), "abc"),
			);
			const target = random.string(random.int(1, 12), "abc");
			expect(minValidStrings(words, target)).toBe(byBruteForce(words, target));
		}
	});
});
