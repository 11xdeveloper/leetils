import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { indexPairsOfAString as indexPairs } from ".";

describe("1065. Index Pairs of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			indexPairs("thestoryofleetcodeandme", ["story", "fleet", "leetcode"]),
		).toEqual([
			[3, 7],
			[9, 13],
			[10, 17],
		]);
		expect(indexPairs("ababa", ["aba", "ab"])).toEqual([
			[0, 1],
			[0, 2],
			[2, 3],
			[2, 4],
		]);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(1065);
		for (let run = 0; run < 500; run++) {
			const text = random.string(random.int(1, 12), "ab");
			const words = Array.from({ length: random.int(1, 4) }, () =>
				random.string(random.int(1, 3), "ab"),
			);
			const expected: number[][] = [];
			for (let i = 0; i < text.length; i++)
				for (let j = i; j < text.length; j++)
					if (words.includes(text.slice(i, j + 1))) expected.push([i, j]);
			expect(indexPairs(text, words)).toEqual(expected);
		}
	});
});
