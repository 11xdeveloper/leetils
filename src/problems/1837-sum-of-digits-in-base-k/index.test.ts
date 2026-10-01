import { describe, expect, it } from "bun:test";
import { sumOfDigitsInBaseK as sumBase } from ".";

describe("1837. Sum of Digits in Base K", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumBase(34, 6)).toBe(9);
		expect(sumBase(10, 10)).toBe(1);
	});

	it("matches the digits of toString for every base", () => {
		for (let k = 2; k <= 10; k++) {
			for (let n = 1; n <= 100; n++)
				expect(sumBase(n, k)).toBe(
					[...n.toString(k)].reduce((s, d) => s + Number(d), 0),
				);
		}
	});
});
