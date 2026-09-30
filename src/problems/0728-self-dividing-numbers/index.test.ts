import { describe, expect, it } from "bun:test";
import { selfDividingNumbers } from ".";

describe("728. Self Dividing Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(selfDividingNumbers(1, 22)).toEqual([
			1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22,
		]);
		expect(selfDividingNumbers(47, 85)).toEqual([48, 55, 66, 77]);
	});

	it("matches checking digit strings up to 10,000", () => {
		const expected = Array.from({ length: 10_000 }, (_, i) => i + 1).filter(
			(num) =>
				[...String(num)].every(
					(digit) => digit !== "0" && num % Number(digit) === 0,
				),
		);
		expect(selfDividingNumbers(1, 10_000)).toEqual(expected);
	});
});
