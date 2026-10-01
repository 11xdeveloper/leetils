import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutationsII } from "../0047-permutations-ii";
import { palindromePermutationII } from ".";

/** Every distinct rearrangement that is a palindrome. */
const byBruteForce = (s: string): string[] =>
	permutationsII([...s].map((c) => c.charCodeAt(0)))
		.map((codes) => String.fromCharCode(...codes))
		.filter((p) => p === [...p].reverse().join(""))
		.toSorted();

describe("267. Palindrome Permutation II", () => {
	it("solves the examples from the problem statement", () => {
		expect(palindromePermutationII("aabb").toSorted()).toEqual([
			"abba",
			"baab",
		]);
		expect(palindromePermutationII("abc")).toEqual([]);
	});

	it("puts the odd letter in the middle", () => {
		expect(palindromePermutationII("aab")).toEqual(["aba"]);
		expect(palindromePermutationII("a")).toEqual(["a"]);
	});

	it("matches filtering every rearrangement on random inputs", () => {
		const random = createRandom(267);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 8), "abc");
			expect(palindromePermutationII(s).toSorted()).toEqual(byBruteForce(s));
		}
	});
});
