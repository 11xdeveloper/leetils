import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubstringOfOneRepeatingCharacter as longestRepeating } from ".";

const longestRun = (chars: string[]): number => {
	let [best, run] = [0, 0];
	for (const [i, char] of chars.entries()) {
		run = i > 0 && chars[i - 1] === char ? run + 1 : 1;
		best = Math.max(best, run);
	}
	return best;
};

describe("2213. Longest Substring of One Repeating Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestRepeating("babacc", "bcb", [1, 3, 3])).toEqual([3, 3, 4]);
		expect(longestRepeating("abyzz", "aa", [2, 1])).toEqual([2, 3]);
	});

	it("matches rescanning after each random update", () => {
		const random = createRandom(2213);
		for (let run = 0; run < 50; run++) {
			const s = random.string(random.int(1, 12), "ab");
			const q = random.int(1, 10);
			const characters = random.string(q, "ab");
			const indices = random.array(q, 0, s.length - 1);
			const chars = [...s];
			const expected = indices.map((index, i) => {
				chars[index] = characters[i] ?? "";
				return longestRun(chars);
			});
			expect(longestRepeating(s, characters, indices)).toEqual(expected);
		}
	});
});
