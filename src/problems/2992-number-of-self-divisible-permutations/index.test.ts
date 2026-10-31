import { describe, expect, it } from "bun:test";
import { numberOfSelfDivisiblePermutations as selfDivisiblePermutationCount } from ".";

describe("2992. Number of Self-Divisible Permutations", () => {
	it("solves the examples from the problem statement", () => {
		expect(selfDivisiblePermutationCount(1)).toBe(1);
		expect(selfDivisiblePermutationCount(2)).toBe(1);
		expect(selfDivisiblePermutationCount(3)).toBe(3);
	});

	it("matches listing permutations for n = 5", () => {
		const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
		const count = (left: number[], position: number): number =>
			left.length === 0
				? 1
				: left.reduce(
						(sum, v, i) =>
							gcd(v, position) === 1
								? sum +
									count(
										[...left.slice(0, i), ...left.slice(i + 1)],
										position + 1,
									)
								: sum,
						0,
					);
		expect(selfDivisiblePermutationCount(5)).toBe(count([1, 2, 3, 4, 5], 1));
	});
});
