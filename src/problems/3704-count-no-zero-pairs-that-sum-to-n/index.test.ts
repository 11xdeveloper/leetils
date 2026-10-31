import { describe, expect, it } from "bun:test";
import { countNoZeroPairsThatSumToN as countNoZeroPairs } from ".";

describe("3704. Count No-Zero Pairs That Sum to N", () => {
	it("solves the examples from the problem statement", () => {
		expect(countNoZeroPairs(2)).toBe(1);
		expect(countNoZeroPairs(3)).toBe(2);
		expect(countNoZeroPairs(11)).toBe(8);
	});

	it("matches checking every pair", () => {
		const noZero = (x: number) => !String(x).includes("0");
		for (let n = 2; n <= 1500; n++) {
			let expected = 0;
			for (let a = 1; a < n; a++) if (noZero(a) && noZero(n - a)) expected++;
			expect(countNoZeroPairs(n)).toBe(expected);
		}
	});
});
