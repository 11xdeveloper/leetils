import { describe, expect, it } from "bun:test";
import { permutations } from "../0046-permutations";
import { permutationSequence } from ".";

describe("60. Permutation Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(permutationSequence(3, 3)).toBe("213");
		expect(permutationSequence(4, 9)).toBe("2314");
		expect(permutationSequence(3, 1)).toBe("123");
	});

	it("returns the digits in reverse for the last permutation", () => {
		expect(permutationSequence(9, 362880)).toBe("987654321");
	});

	it("matches listing every permutation in order", () => {
		for (let n = 1; n <= 6; n++) {
			const all = permutations(Array.from({ length: n }, (_, i) => i + 1));
			for (const [i, permutation] of all.entries()) {
				expect(permutationSequence(n, i + 1)).toBe(permutation.join(""));
			}
		}
	});
});
