import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validPalindrome } from ".";

const byCleaning = (s: string): boolean => {
	const cleaned = s.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
	return cleaned === [...cleaned].reverse().join("");
};

describe("125. Valid Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(validPalindrome("A man, a plan, a canal: Panama")).toBeTrue();
		expect(validPalindrome("race a car")).toBeFalse();
		expect(validPalindrome(" ")).toBeTrue();
	});

	it("treats digits as characters, not ignored symbols", () => {
		expect(validPalindrome("0P")).toBeFalse();
		expect(validPalindrome("1a2 2A1")).toBeTrue();
	});

	it("matches cleaning the string and reversing it on random inputs", () => {
		const random = createRandom(125);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 12), "aAb1 ,:.");
			expect(validPalindrome(s)).toBe(byCleaning(s));
		}
	});
});
