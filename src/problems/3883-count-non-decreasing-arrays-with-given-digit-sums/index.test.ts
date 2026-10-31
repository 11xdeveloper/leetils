import { describe, expect, it } from "bun:test";
import { countNonDecreasingArraysWithGivenDigitSums as countArrays } from ".";

describe("3883. Count Non Decreasing Arrays With Given Digit Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(countArrays([25, 1])).toBe(6);
		expect(countArrays([1])).toBe(4);
		expect(countArrays([2, 49, 23])).toBe(0);
	});

	it("counts pairs of small digit sums directly", () => {
		const sum = (x: number) =>
			[...String(x)].reduce((s, d) => s + Number(d), 0);
		let expected = 0;
		for (let a = 0; a <= 5000; a++)
			if (sum(a) === 2)
				for (let b = a; b <= 5000; b++) if (sum(b) === 3) expected++;
		expect(countArrays([2, 3])).toBe(expected);
	});
});
