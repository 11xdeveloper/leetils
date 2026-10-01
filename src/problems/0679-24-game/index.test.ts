import { describe, expect, it } from "bun:test";
import { twoFourGame as judgePoint24 } from ".";

type Fraction = [numerator: number, denominator: number];

const gcd = (a: number, b: number): number =>
	b === 0 ? Math.abs(a) : gcd(b, a % b);
const fraction = (numerator: number, denominator: number): Fraction => {
	const divisor = gcd(numerator, denominator) || 1;
	const sign = denominator < 0 ? -1 : 1;
	return [(sign * numerator) / divisor, (sign * denominator) / divisor];
};

/** The same search with exact fractions, so no rounding is involved. */
const byFractions = (cards: number[]): boolean => {
	const solve = (numbers: Fraction[]): boolean => {
		if (numbers.length === 1)
			return numbers[0]?.[0] === 24 && numbers[0]?.[1] === 1;
		for (let i = 0; i < numbers.length; i++) {
			for (let j = 0; j < numbers.length; j++) {
				if (i === j) continue;
				const [a, b] = numbers[i] ?? [0, 1];
				const [c, d] = numbers[j] ?? [0, 1];
				const rest = numbers.filter((_, k) => k !== i && k !== j);
				const results = [
					fraction(a * d + c * b, b * d),
					fraction(a * d - c * b, b * d),
					fraction(a * c, b * d),
				];
				if (c !== 0) results.push(fraction(a * d, b * c));
				if (results.some((result) => solve([...rest, result]))) return true;
			}
		}
		return false;
	};
	return solve(cards.map((card) => [card, 1]));
};

describe("679. 24 Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(judgePoint24([4, 1, 8, 7])).toBeTrue();
		expect(judgePoint24([1, 2, 1, 2])).toBeFalse();
	});

	it("needs real division", () => {
		expect(judgePoint24([3, 3, 8, 8])).toBeTrue();
		expect(judgePoint24([1, 5, 5, 5])).toBeTrue();
	});

	it("matches exact fractions for every hand of cards", () => {
		for (let a = 1; a <= 9; a++) {
			for (let b = a; b <= 9; b++) {
				for (let c = b; c <= 9; c++) {
					for (let d = c; d <= 9; d++)
						expect(judgePoint24([a, b, c, d])).toBe(byFractions([a, b, c, d]));
				}
			}
		}
	});
});
