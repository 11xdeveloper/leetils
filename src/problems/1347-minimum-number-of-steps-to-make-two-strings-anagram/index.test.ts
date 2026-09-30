import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfStepsToMakeTwoStringsAnagram as minSteps } from ".";

/** The characters of t that can't be matched to one of s must be replaced. */
const byBruteForce = (s: string, t: string): number => {
	const left = [...s];
	let unmatched = 0;
	for (const char of t) {
		const i = left.indexOf(char);
		if (i === -1) unmatched++;
		else left.splice(i, 1);
	}
	return unmatched;
};

describe("1347. Minimum Number of Steps to Make Two Strings Anagram", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSteps("bab", "aba")).toBe(1);
		expect(minSteps("leetcode", "practice")).toBe(5);
		expect(minSteps("anagram", "mangaar")).toBe(0);
	});

	it("matches crossing off matching letters on random inputs", () => {
		const random = createRandom(1347);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const [s, t] = [random.string(n, "abcd"), random.string(n, "abcd")];
			expect(minSteps(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
