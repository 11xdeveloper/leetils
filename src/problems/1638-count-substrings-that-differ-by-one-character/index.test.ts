import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubstringsThatDifferByOneCharacter as countSubstrings } from ".";

/** Compares every pair of equally long substrings. */
const byBruteForce = (s: string, t: string): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = 0; j < t.length; j++) {
			let differences = 0;
			for (
				let length = 1;
				i + length <= s.length && j + length <= t.length;
				length++
			) {
				if (s[i + length - 1] !== t[j + length - 1]) differences++;
				if (differences === 1) count++;
			}
		}
	}
	return count;
};

describe("1638. Count Substrings That Differ by One Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubstrings("aba", "baba")).toBe(6);
		expect(countSubstrings("ab", "bb")).toBe(3);
	});

	it("matches comparing every pair of substrings on random inputs", () => {
		const random = createRandom(1638);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 8), "ab");
			const t = random.string(random.int(1, 8), "ab");
			expect(countSubstrings(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
