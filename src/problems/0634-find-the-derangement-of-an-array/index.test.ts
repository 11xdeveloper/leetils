import { describe, expect, it } from "bun:test";
import { permutations } from "../0046-permutations";
import { findTheDerangementOfAnArray as findDerangement } from ".";

describe("634. Find the Derangement of An Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findDerangement(3)).toBe(2);
		expect(findDerangement(2)).toBe(1);
		expect(findDerangement(1)).toBe(0);
	});

	it("matches checking every permutation up to n = 8", () => {
		for (let n = 1; n <= 8; n++) {
			const derangements = permutations(
				Array.from({ length: n }, (_, i) => i),
			).filter((perm) => perm.every((value, i) => value !== i));
			expect(findDerangement(n)).toBe(derangements.length);
		}
	});

	it("matches BigInt arithmetic for the largest input", () => {
		let [previous, current] = [1n, 0n];
		for (let size = 2n; size <= 1_000_000n; size++)
			[previous, current] = [
				current,
				((size - 1n) * (previous + current)) % 1_000_000_007n,
			];
		expect(findDerangement(1_000_000)).toBe(Number(current));
	});
});
