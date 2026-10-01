import { describe, expect, it } from "bun:test";
import { maximum69Number } from ".";

describe("1323. Maximum 69 Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximum69Number(9669)).toBe(9969);
		expect(maximum69Number(9996)).toBe(9999);
		expect(maximum69Number(9999)).toBe(9999);
	});

	it("matches trying every change for every number of 6s and 9s up to four digits", () => {
		for (let length = 1; length <= 4; length++) {
			for (let mask = 0; mask < 2 ** length; mask++) {
				const digits = Array.from({ length }, (_, i) =>
					(mask >> i) & 1 ? "9" : "6",
				);
				const num = Number(digits.join(""));
				const options = [
					num,
					...digits.map((d, i) =>
						Number(digits.with(i, d === "6" ? "9" : "6").join("")),
					),
				];
				expect(maximum69Number(num)).toBe(Math.max(...options));
			}
		}
	});
});
