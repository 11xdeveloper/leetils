import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromicSubstrings as countSubstrings } from ".";

const byBruteForce = (s: string): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const sub = s.slice(i, j);
			if (sub === [...sub].reverse().join("")) count++;
		}
	}
	return count;
};

describe("647. Palindromic Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubstrings("abc")).toBe(3);
		expect(countSubstrings("aaa")).toBe(6);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(647);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "ab");
			expect(countSubstrings(s)).toBe(byBruteForce(s));
		}
	});
});
