import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestSubstringBetweenTwoEqualCharacters as maxLengthBetweenEqualCharacters } from ".";

describe("1624. Largest Substring Between Two Equal Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxLengthBetweenEqualCharacters("aa")).toBe(0);
		expect(maxLengthBetweenEqualCharacters("abca")).toBe(2);
		expect(maxLengthBetweenEqualCharacters("cbzxy")).toBe(-1);
	});

	it("matches checking every pair on random strings", () => {
		const random = createRandom(1624);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "abcd");
			let longest = -1;
			for (let i = 0; i < s.length; i++) {
				for (let j = i + 1; j < s.length; j++)
					if (s[i] === s[j]) longest = Math.max(longest, j - i - 1);
			}
			expect(maxLengthBetweenEqualCharacters(s)).toBe(longest);
		}
	});
});
