import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestPermutationGreaterThanTarget as lexGreaterPermutation } from ".";

/** Tries every permutation. */
const byBruteForce = (s: string, target: string): string => {
	let best = "";
	const go = (prefix: string, rest: string): void => {
		if (rest.length === 0) {
			if (prefix > target && (best === "" || prefix < best)) best = prefix;
			return;
		}
		for (let i = 0; i < rest.length; i++)
			go(prefix + rest[i], rest.slice(0, i) + rest.slice(i + 1));
	};
	go("", s);
	return best;
};

describe("3720. Lexicographically Smallest Permutation Greater Than Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexGreaterPermutation("abc", "bba")).toBe("bca");
		expect(lexGreaterPermutation("leet", "code")).toBe("eelt");
		expect(lexGreaterPermutation("baba", "bbaa")).toBe("");
	});

	it("matches trying every permutation on random strings", () => {
		const random = createRandom(3720);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 6);
			const [s, target] = [random.string(n, "abc"), random.string(n, "abc")];
			expect(lexGreaterPermutation(s, target)).toBe(byBruteForce(s, target));
		}
	});
});
