import { describe, expect, it } from "bun:test";
import { numbersWithSameConsecutiveDifferences as numsSameConsecDiff } from ".";

describe("967. Numbers With Same Consecutive Differences", () => {
	it("solves the examples from the problem statement", () => {
		expect(numsSameConsecDiff(3, 7)).toEqual([181, 292, 707, 818, 929]);
		expect(numsSameConsecDiff(2, 1)).toEqual([
			10, 12, 21, 23, 32, 34, 43, 45, 54, 56, 65, 67, 76, 78, 87, 89, 98,
		]);
	});

	it("matches checking every number with up to 5 digits", () => {
		for (let n = 2; n <= 5; n++) {
			for (let k = 0; k <= 9; k++) {
				const expected: number[] = [];
				for (let num = 10 ** (n - 1); num < 10 ** n; num++) {
					const digits = [...String(num)].map(Number);
					if (
						digits.every(
							(d, i) => i === 0 || Math.abs(d - (digits[i - 1] ?? 0)) === k,
						)
					)
						expected.push(num);
				}
				expect(numsSameConsecDiff(n, k)).toEqual(expected);
			}
		}
	});
});
