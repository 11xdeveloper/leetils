import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestCommonSuffixQueries as stringIndices } from ".";

/** Compares every pair of words. */
const byBruteForce = (container: string[], queries: string[]): number[] =>
	queries.map((query) => {
		let best = 0;
		let bestSuffix = -1;
		container.forEach((word, i) => {
			let suffix = 0;
			while (
				suffix < Math.min(word.length, query.length) &&
				word[word.length - 1 - suffix] === query[query.length - 1 - suffix]
			)
				suffix++;
			if (
				suffix > bestSuffix ||
				(suffix === bestSuffix && word.length < (container[best]?.length ?? 0))
			) {
				best = i;
				bestSuffix = suffix;
			}
		});
		return best;
	});

describe("3093. Longest Common Suffix Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			stringIndices(["abcd", "bcd", "xbcd"], ["cd", "bcd", "xyz"]),
		).toEqual([1, 1, 1]);
		expect(
			stringIndices(
				["abcdefgh", "poiuygh", "ghghgh"],
				["gh", "acbfgh", "acbfegh"],
			),
		).toEqual([2, 0, 2]);
	});

	it("matches comparing every pair on random words", () => {
		const random = createRandom(3093);
		for (let run = 0; run < 300; run++) {
			const make = () =>
				Array.from({ length: random.int(1, 6) }, () =>
					random.string(random.int(1, 5), "ab"),
				);
			const container = make();
			const queries = make();
			expect(stringIndices(container, queries)).toEqual(
				byBruteForce(container, queries),
			);
		}
	});
});
