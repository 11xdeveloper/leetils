import { describe, expect, it } from "bun:test";
import { permutations } from "../0046-permutations";
import { beautifulArrangement as countArrangement } from ".";

const byBruteForce = (n: number): number =>
	permutations(Array.from({ length: n }, (_, i) => i + 1)).filter((perm) =>
		perm.every((num, i) => num % (i + 1) === 0 || (i + 1) % num === 0),
	).length;

describe("526. Beautiful Arrangement", () => {
	it("solves the examples from the problem statement", () => {
		expect(countArrangement(2)).toBe(2);
		expect(countArrangement(1)).toBe(1);
	});

	it("matches checking every permutation up to n = 8", () => {
		for (let n = 1; n <= 8; n++)
			expect(countArrangement(n)).toBe(byBruteForce(n));
	});

	it("handles the largest input", () => {
		expect(countArrangement(15)).toBe(24679);
	});
});
