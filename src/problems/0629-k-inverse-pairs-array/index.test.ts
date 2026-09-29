import { describe, expect, it } from "bun:test";
import { permutations } from "../0046-permutations";
import { kInversePairsArray as kInversePairs } from ".";

const inversions = (perm: number[]): number => {
	let count = 0;
	for (let i = 0; i < perm.length; i++)
		for (let j = i + 1; j < perm.length; j++)
			if ((perm[i] ?? 0) > (perm[j] ?? 0)) count++;
	return count;
};

describe("629. K Inverse Pairs Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(kInversePairs(3, 0)).toBe(1);
		expect(kInversePairs(3, 1)).toBe(2);
	});

	it("matches counting inversions of every permutation up to n = 7", () => {
		for (let n = 1; n <= 7; n++) {
			const counts = new Map<number, number>();
			for (const perm of permutations(
				Array.from({ length: n }, (_, i) => i + 1),
			)) {
				counts.set(inversions(perm), (counts.get(inversions(perm)) ?? 0) + 1);
			}
			for (let k = 0; k <= 25; k++)
				expect(kInversePairs(n, k)).toBe(counts.get(k) ?? 0);
		}
	});

	it("handles the largest inputs", () => {
		expect(kInversePairs(1000, 1000)).toBe(663677020);
	});
});
