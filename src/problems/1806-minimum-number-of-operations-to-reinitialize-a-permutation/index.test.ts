import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToReinitializeAPermutation as reinitializePermutation } from ".";

/** Applies the operation to the whole permutation until it is the identity again. */
const bySimulation = (n: number): number => {
	let perm = Array.from({ length: n }, (_, i) => i);
	for (let operations = 1; ; operations++) {
		const current = perm;
		perm = current.map((_, i) =>
			i % 2 === 0 ? (current[i / 2] ?? 0) : (current[n / 2 + (i - 1) / 2] ?? 0),
		);
		if (perm.every((value, i) => value === i)) return operations;
	}
};

describe("1806. Minimum Number of Operations to Reinitialize a Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(reinitializePermutation(2)).toBe(1);
		expect(reinitializePermutation(4)).toBe(2);
		expect(reinitializePermutation(6)).toBe(4);
	});

	it("matches applying the whole operation for every even n up to 200", () => {
		for (let n = 2; n <= 200; n += 2)
			expect(reinitializePermutation(n)).toBe(bySimulation(n));
	});
});
