import { describe, expect, it } from "bun:test";
import { rotatedDigits } from ".";

const rotate: Record<string, string> = {
	"0": "0",
	"1": "1",
	"8": "8",
	"2": "5",
	"5": "2",
	"6": "9",
	"9": "6",
};

describe("788. Rotated Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(rotatedDigits(10)).toBe(4);
		expect(rotatedDigits(1)).toBe(0);
		expect(rotatedDigits(2)).toBe(1);
	});

	it("matches rotating digit strings up to 10,000", () => {
		let expected = 0;
		for (let n = 1; n <= 10_000; n++) {
			const digits = [...String(n)];
			if (
				digits.every((digit) => digit in rotate) &&
				digits.map((digit) => rotate[digit]).join("") !== String(n)
			)
				expected++;
			if (n % 97 === 0 || n === 10_000) expect(rotatedDigits(n)).toBe(expected);
		}
	});
});
