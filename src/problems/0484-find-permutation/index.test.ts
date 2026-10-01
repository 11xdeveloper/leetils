import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { findPermutation } from ".";

const byBruteForce = (s: string): number[] =>
	permutations(Array.from({ length: s.length + 1 }, (_, i) => i + 1))
		.filter((p) =>
			[...s].every((c, i) => (c === "I") === (p[i] ?? 0) < (p[i + 1] ?? 0)),
		)
		.sort((a, b) =>
			a.join(",").localeCompare(b.join(","), undefined, { numeric: true }),
		)[0] ?? [];

describe("484. Find Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPermutation("I")).toEqual([1, 2]);
		expect(findPermutation("DI")).toEqual([2, 1, 3]);
	});

	it("matches trying every permutation on random inputs", () => {
		const random = createRandom(484);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 6), "ID");
			expect(findPermutation(s)).toEqual(byBruteForce(s));
		}
	});
});
