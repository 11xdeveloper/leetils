import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutationsII } from "../0047-permutations-ii";
import { palindromePermutation } from ".";

/** Tries every distinct rearrangement. */
const byBruteForce = (s: string): boolean =>
	permutationsII([...s].map((c) => c.charCodeAt(0))).some(
		(codes) => codes.join() === codes.toReversed().join(),
	);

describe("266. Palindrome Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(palindromePermutation("code")).toBeFalse();
		expect(palindromePermutation("aab")).toBeTrue();
		expect(palindromePermutation("carerac")).toBeTrue();
	});

	it("matches trying every rearrangement on random inputs", () => {
		const random = createRandom(266);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 7), "abc");
			expect(palindromePermutation(s)).toBe(byBruteForce(s));
		}
	});
});
