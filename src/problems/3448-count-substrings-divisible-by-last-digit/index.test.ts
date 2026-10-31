import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubstringsDivisibleByLastDigit as countSubstrings } from ".";

/** Checks every substring with exact integers. */
const byBruteForce = (s: string): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++)
		for (let j = i + 1; j <= s.length; j++) {
			const last = Number(s[j - 1]);
			if (last > 0 && BigInt(s.slice(i, j)) % BigInt(last) === 0n) count++;
		}
	return count;
};

describe("3448. Count Substrings Divisible By Last Digit", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubstrings("12936")).toBe(11);
		expect(countSubstrings("5701283")).toBe(18);
		expect(countSubstrings("1010101010")).toBe(25);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(3448);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 15), "0123456789");
			expect(countSubstrings(s)).toBe(byBruteForce(s));
		}
	});
});
