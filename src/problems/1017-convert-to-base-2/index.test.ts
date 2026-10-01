import { describe, expect, it } from "bun:test";
import { convertToBase2 as baseNeg2 } from ".";

const evaluate = (digits: string): number =>
	[...digits]
		.reverse()
		.reduce((total, digit, i) => total + Number(digit) * (-2) ** i, 0);

describe("1017. Convert to Base -2", () => {
	it("solves the examples from the problem statement", () => {
		expect(baseNeg2(2)).toBe("110");
		expect(baseNeg2(3)).toBe("111");
		expect(baseNeg2(4)).toBe("100");
		expect(baseNeg2(0)).toBe("0");
	});

	it("round-trips every n up to 10,000", () => {
		for (let n = 1; n <= 10_000; n++) {
			const digits = baseNeg2(n);
			expect(digits.startsWith("1")).toBeTrue();
			expect(evaluate(digits)).toBe(n);
		}
	});
});
