import { describe, expect, it } from "bun:test";
import { confusingNumber } from ".";

describe("1056. Confusing Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(confusingNumber(6)).toBeTrue();
		expect(confusingNumber(89)).toBeTrue();
		expect(confusingNumber(11)).toBeFalse();
	});

	it("matches rotating the digit string for n up to 10,000", () => {
		const rotate: Record<string, string> = {
			"0": "0",
			"1": "1",
			"6": "9",
			"8": "8",
			"9": "6",
		};
		for (let n = 0; n <= 10_000; n++) {
			const digits = [...String(n)];
			const expected =
				digits.every((d) => d in rotate) &&
				Number(
					digits
						.reverse()
						.map((d) => rotate[d])
						.join(""),
				) !== n;
			expect(confusingNumber(n)).toBe(expected);
		}
	});
});
