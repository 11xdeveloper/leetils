import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { beforeAndAfterPuzzle as beforeAndAfterPuzzles } from ".";

/** Tries every ordered pair of phrases. */
const byBruteForce = (phrases: string[]): string[] => {
	const puzzles = new Set<string>();
	phrases.forEach((a, i) => {
		phrases.forEach((b, j) => {
			const [wordsA, wordsB] = [a.split(" "), b.split(" ")];
			if (i !== j && wordsA.at(-1) === wordsB[0]) {
				puzzles.add([...wordsA, ...wordsB.slice(1)].join(" "));
			}
		});
	});
	return [...puzzles].sort();
};

describe("1181. Before and After Puzzle", () => {
	it("solves the examples from the problem statement", () => {
		expect(beforeAndAfterPuzzles(["writing code", "code rocks"])).toEqual([
			"writing code rocks",
		]);
		expect(
			beforeAndAfterPuzzles([
				"mission statement",
				"a quick bite to eat",
				"a chip off the old block",
				"chocolate bar",
				"mission impossible",
				"a man on a mission",
				"block party",
				"eat my words",
				"bar of soap",
			]),
		).toEqual([
			"a chip off the old block party",
			"a man on a mission impossible",
			"a man on a mission statement",
			"a quick bite to eat my words",
			"chocolate bar of soap",
		]);
		expect(beforeAndAfterPuzzles(["a", "b", "a"])).toEqual(["a"]);
		expect(beforeAndAfterPuzzles(["ab ba", "ba ab", "ab ba"])).toEqual([
			"ab ba ab",
			"ba ab ba",
		]);
	});

	it("doesn't merge a phrase with itself", () => {
		expect(beforeAndAfterPuzzles(["a b a"])).toEqual([]);
	});

	it("matches trying every pair on random inputs", () => {
		const random = createRandom(1181);
		for (let run = 0; run < 300; run++) {
			const phrases = Array.from({ length: random.int(1, 6) }, () =>
				Array.from({ length: random.int(1, 3) }, () =>
					random.string(random.int(1, 2), "ab"),
				).join(" "),
			);
			expect(beforeAndAfterPuzzles(phrases)).toEqual(byBruteForce(phrases));
		}
	});
});
