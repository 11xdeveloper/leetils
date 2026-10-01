import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheClosestPalindrome as nearestPalindromic } from ".";

const isPalindrome = (value: number): boolean =>
	String(value) === [...String(value)].reverse().join("");

/** Searches outwards, trying the smaller side first. */
const bySearch = (n: number): number => {
	for (let distance = 1; ; distance++) {
		if (n - distance >= 0 && isPalindrome(n - distance)) return n - distance;
		if (isPalindrome(n + distance)) return n + distance;
	}
};

describe("564. Find the Closest Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(nearestPalindromic("123")).toBe("121");
		expect(nearestPalindromic("1")).toBe("0");
	});

	it("handles the edges of each length", () => {
		expect(nearestPalindromic("10")).toBe("9");
		expect(nearestPalindromic("11")).toBe("9");
		expect(nearestPalindromic("99")).toBe("101");
		expect(nearestPalindromic("100")).toBe("99");
		expect(nearestPalindromic("999999999999999999")).toBe(
			"1000000000000000001",
		);
		expect(nearestPalindromic("807045053224792883")).toBe("807045053350540708");
	});

	it("matches searching outwards for every n up to 3,000", () => {
		for (let n = 1; n <= 3000; n++)
			expect(nearestPalindromic(String(n))).toBe(String(bySearch(n)));
	});

	it("matches searching outwards on random larger inputs", () => {
		const random = createRandom(564);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10 ** 7);
			expect(nearestPalindromic(String(n))).toBe(String(bySearch(n)));
		}
	});
});
