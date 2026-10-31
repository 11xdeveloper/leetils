import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeEveryElementPalindromic as minOperations } from ".";

describe("4053. Minimum Operations to Make Every Element Palindromic", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([10, 12, 14, 16])).toBe(9);
		expect(minOperations([9, 10, 11, 10])).toBe(2);
		expect(minOperations([125])).toBe(2);
	});

	it("matches walking in steps of two", () => {
		const isPalindrome = (x: number) =>
			String(x) === [...String(x)].reverse().join("");
		for (let x = 1; x <= 400; x++) {
			let steps = 0;
			while (
				!isPalindrome(x + 2 * steps) &&
				!(x - 2 * steps > 0 && isPalindrome(x - 2 * steps))
			)
				steps++;
			expect(minOperations([x])).toBe(steps);
		}
	});
});
