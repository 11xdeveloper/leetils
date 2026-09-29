import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubstringWithAtLeastKRepeatingCharacters as longest } from ".";

const byBruteForce = (s: string, k: number): number => {
	let best = 0;
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j <= s.length; j++) {
			const window = s.slice(i, j);
			if (
				[...new Set(window)].every(
					(c) => [...window].filter((x) => x === c).length >= k,
				)
			) {
				best = Math.max(best, j - i);
			}
		}
	}
	return best;
};

describe("395. Longest Substring with At Least K Repeating Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(longest("aaabb", 3)).toBe(3);
		expect(longest("ababbc", 2)).toBe(5);
	});

	it("returns the whole length when k is 1", () => {
		expect(longest("abcde", 1)).toBe(5);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(395);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 15), "abc");
			const k = random.int(1, 4);
			expect(longest(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
