import { describe, expect, it } from "bun:test";
import { confusingNumber } from "../1056-confusing-number";
import { confusingNumberII } from ".";

describe("1088. Confusing Number II", () => {
	it("solves the examples from the problem statement", () => {
		expect(confusingNumberII(20)).toBe(6);
		expect(confusingNumberII(100)).toBe(19);
	});

	it("matches checking every number with Confusing Number up to 20,000", () => {
		let count = 0;
		for (let n = 1; n <= 20_000; n++) {
			if (confusingNumber(n)) count++;
			if (n % 97 === 0 || n === 20_000)
				expect(confusingNumberII(n)).toBe(count);
		}
	});

	it("handles the largest input", () => {
		expect(confusingNumberII(10 ** 9)).toBe(1950627);
	});
});
