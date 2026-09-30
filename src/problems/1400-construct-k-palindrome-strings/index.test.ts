import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { constructKPalindromeStrings as canConstruct } from ".";

/** Tries splitting the letters every way into k groups, each rearrangeable into a palindrome. */
const byBruteForce = (s: string, k: number): boolean => {
	const groups: string[][] = Array.from({ length: k }, () => []);
	const palindromic = (group: string[]) => {
		const counts = new Map<string, number>();
		for (const char of group) counts.set(char, (counts.get(char) ?? 0) + 1);
		return (
			group.length > 0 &&
			[...counts.values()].filter((c) => c % 2 === 1).length <= 1
		);
	};
	const place = (i: number): boolean => {
		if (i === s.length) return groups.every(palindromic);
		for (const group of groups) {
			group.push(s[i] ?? "");
			if (place(i + 1)) return true;
			group.pop();
		}
		return false;
	};
	return place(0);
};

describe("1400. Construct K Palindrome Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(canConstruct("annabelle", 2)).toBeTrue();
		expect(canConstruct("leetcode", 3)).toBeFalse();
		expect(canConstruct("true", 4)).toBeTrue();
	});

	it("needs at least k characters", () => {
		expect(canConstruct("aa", 3)).toBeFalse();
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1400);
		for (let run = 0; run < 150; run++) {
			const s = random.string(random.int(1, 7), "abc");
			const k = random.int(1, 4);
			expect(canConstruct(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
