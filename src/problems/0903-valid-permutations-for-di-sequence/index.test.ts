import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { validPermutationsForDiSequence as numPermsDISequence } from ".";

describe("903. Valid Permutations for DI Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(numPermsDISequence("DID")).toBe(5);
		expect(numPermsDISequence("D")).toBe(1);
	});

	it("matches checking every permutation on random sequences", () => {
		const random = createRandom(903);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 6), "DI");
			const expected = permutations(
				Array.from({ length: s.length + 1 }, (_, i) => i),
			).filter((perm) =>
				[...s].every(
					(letter, i) =>
						(letter === "I") === (perm[i] ?? 0) < (perm[i + 1] ?? 0),
				),
			).length;
			expect(numPermsDISequence(s)).toBe(expected);
		}
	});

	it("reduces long sequences modulo 10^9 + 7", () => {
		expect(numPermsDISequence("DI".repeat(100))).toBeWithin(0, 1_000_000_007);
	});
});
