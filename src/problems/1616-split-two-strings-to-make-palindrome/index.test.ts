import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitTwoStringsToMakePalindrome as checkPalindromeFormation } from ".";

/** Tries every split. */
const byBruteForce = (a: string, b: string): boolean => {
	const palindrome = (s: string) => s === [...s].reverse().join("");
	for (let i = 0; i <= a.length; i++) {
		if (
			palindrome(a.slice(0, i) + b.slice(i)) ||
			palindrome(b.slice(0, i) + a.slice(i))
		)
			return true;
	}
	return false;
};

describe("1616. Split Two Strings to Make Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkPalindromeFormation("x", "y")).toBeTrue();
		expect(checkPalindromeFormation("xbdef", "xecab")).toBeFalse();
		expect(checkPalindromeFormation("ulacfd", "jizalu")).toBeTrue();
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1616);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const [a, b] = [random.string(n, "ab"), random.string(n, "ab")];
			expect(checkPalindromeFormation(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
