import { describe, expect, it } from "bun:test";
import { beautifulArrangementII as constructArray } from ".";

describe("667. Beautiful Arrangement II", () => {
	it("solves the examples from the problem statement", () => {
		expect(constructArray(3, 1)).toEqual([1, 2, 3]);
		expect(constructArray(3, 2)).toEqual([1, 3, 2]);
	});

	it("gives a permutation with exactly k distinct differences for every n up to 60", () => {
		for (let n = 2; n <= 60; n++) {
			for (let k = 1; k < n; k++) {
				const result = constructArray(n, k);
				expect(result.toSorted((a, b) => a - b)).toEqual(
					Array.from({ length: n }, (_, i) => i + 1),
				);
				const differences = new Set(
					result.slice(1).map((value, i) => Math.abs(value - (result[i] ?? 0))),
				);
				expect(differences.size).toBe(k);
			}
		}
	});
});
