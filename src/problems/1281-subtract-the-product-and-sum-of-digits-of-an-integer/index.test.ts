import { describe, expect, it } from "bun:test";
import { subtractTheProductAndSumOfDigitsOfAnInteger as subtractProductAndSum } from ".";

describe("1281. Subtract the Product and Sum of Digits of an Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(subtractProductAndSum(234)).toBe(15);
		expect(subtractProductAndSum(4421)).toBe(21);
	});

	it("matches working on the digit string up to 10^5", () => {
		for (let n = 1; n <= 10 ** 5; n += 7) {
			const digits = [...String(n)].map(Number);
			expect(subtractProductAndSum(n)).toBe(
				digits.reduce((p, d) => p * d, 1) - digits.reduce((s, d) => s + d, 0),
			);
		}
	});
});
