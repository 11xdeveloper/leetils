import { describe, expect, it } from "bun:test";
import { primePalindrome } from ".";

describe("866. Prime Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(primePalindrome(6)).toBe(7);
		expect(primePalindrome(8)).toBe(11);
		expect(primePalindrome(13)).toBe(101);
	});

	it("matches counting up for every n up to 20,000", () => {
		const isPrime = (v: number) =>
			v > 1 &&
			Array.from(
				{ length: Math.floor(Math.sqrt(v)) - 1 },
				(_, i) => i + 2,
			).every((d) => v % d !== 0);
		const isPalindrome = (v: number) =>
			String(v) === [...String(v)].reverse().join("");
		let next = 0;
		for (let n = 20_000; n >= 1; n--) {
			if (isPrime(n) && isPalindrome(n)) next = n;
			if (next === 0) {
				next = n;
				while (!(isPrime(next) && isPalindrome(next))) next++;
			}
			expect(primePalindrome(n)).toBe(next);
		}
	});

	it("handles the largest input", () => {
		expect(primePalindrome(10 ** 8)).toBe(100030001);
	});
});
