import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfScoresOfBuiltStrings as sumScores } from ".";

/** Compares each suffix with the string directly. */
const byBruteForce = (s: string): number => {
	let total = 0;
	for (let i = 0; i < s.length; i++) {
		let length = 0;
		while (i + length < s.length && s[length] === s[i + length]) length++;
		total += length;
	}
	return total;
};

describe("2223. Sum of Scores of Built Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumScores("babab")).toBe(9);
		expect(sumScores("azbazbzaz")).toBe(14);
	});

	it("matches comparing every suffix on random strings", () => {
		const random = createRandom(2223);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 20), "ab");
			expect(sumScores(s)).toBe(byBruteForce(s));
		}
	});
});
