import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nextPalindromeUsingSameDigits as nextPalindrome } from ".";

/** Searches every arrangement of the digits for the smallest larger palindrome. */
const byBruteForce = (num: string): string => {
	const results = new Set<string>();
	const build = (left: string[], prefix: string) => {
		if (left.length === 0) {
			if (prefix === [...prefix].reverse().join("") && prefix > num)
				results.add(prefix);
			return;
		}
		for (const [i, digit] of left.entries())
			build(
				left.filter((_, j) => j !== i),
				prefix + digit,
			);
	};
	build([...num], "");
	return [...results].sort()[0] ?? "";
};

describe("1842. Next Palindrome Using Same Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextPalindrome("1221")).toBe("2112");
		expect(nextPalindrome("32123")).toBe("");
		expect(nextPalindrome("45544554")).toBe("54455445");
	});

	it("matches searching every arrangement on random palindromes", () => {
		const random = createRandom(1842);
		for (let run = 0; run < 100; run++) {
			const front = random.string(random.int(1, 3), "1234");
			const middle = random.int(0, 1) ? random.string(1, "123") : "";
			const num = front + middle + [...front].reverse().join("");
			expect(nextPalindrome(num)).toBe(byBruteForce(num));
		}
	});
});
